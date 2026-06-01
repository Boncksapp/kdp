"""
REST API routes for KDP Studio backend.
Provides endpoints for:
- API key management (encrypted storage)
- Project creation with page planning
- Job status tracking
"""

import json
import logging
from typing import Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.key_manager import save_api_key, load_api_key, delete_api_key
from app.services.page_planner import generate_book_plan, BookPlan
from app.services.job_queue import enqueue_job, get_job, list_jobs, runner
from app.services.image_gen import generate_image_sync, KDP_TRIM_SIZES

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1")


# ── Request / Response Models ───────────────────────────────────────

# --- API Key Management ---

class SaveKeyRequest(BaseModel):
    profile_name: str = Field(default="default", description="User profile identifier")
    service: str = Field(..., description="Service name: 'openai' or 'stability'")
    api_key: str = Field(..., description="The API key to store")


class DeleteKeyRequest(BaseModel):
    profile_name: str = Field(default="default")
    service: str = Field(...)


class KeyStatusResponse(BaseModel):
    openai_configured: bool = False
    stability_configured: bool = False


# --- Project Creation ---

class CreateProjectRequest(BaseModel):
    profile_name: str = Field(default="default", description="User profile identifier")
    description: str = Field(..., description="Description of the book to create")
    book_type: Optional[str] = Field(default=None, description="fiction|non-fiction|children|low-content")
    page_count: Optional[int] = Field(default=None, ge=1, le=1000)
    author_name: Optional[str] = Field(default=None)


class CreateProjectResponse(BaseModel):
    project_id: str
    job_id: str
    message: str
    status: str = "queued"


# --- Job Status ---

class JobStatusResponse(BaseModel):
    job_id: str
    job_type: str
    status: str
    progress: float
    result: Optional[dict] = None
    error: Optional[str] = None
    created_at: str
    updated_at: str


class PlanBookResponse(BaseModel):
    status: str
    plan: dict


# --- Image Generation ---

class GenerateImageRequest(BaseModel):
    profile_name: str = Field(default="default")
    prompt: str = Field(..., description="SDXL image generation prompt")
    trim_size: str = Field(default="6x9", description="KDP trim size (6x9, 8.5x11, etc.)")
    is_coloring: bool = Field(default=False, description="Enable coloring book mode (B&W, line art)")
    needs_resize: bool = Field(default=True, description="Auto-resize for KDP layout")
    async_mode: bool = Field(default=False, description="Run as background job")


class GenerateImageResponse(BaseModel):
    status: str
    image_path: str = ""
    width: int = 0
    height: int = 0
    is_coloring: bool = False
    job_id: str = ""
    error: Optional[str] = None


# ── Routes ───────────────────────────────────────────────────────────

# --- Health Check ---

@router.get("/health")
async def health_check():
    return {"status": "ok", "service": "kdp-studio-backend", "version": "0.1.0"}


# --- API Key Management (encrypted storage) ---

@router.post("/keys/save")
async def save_key(req: SaveKeyRequest):
    """Encrypt and store an API key."""
    if req.service not in ("openai", "stability"):
        raise HTTPException(status_code=400, detail="Service must be 'openai' or 'stability'")
    save_api_key(req.profile_name, req.service, req.api_key)
    return {"status": "saved", "service": req.service, "profile": req.profile_name}


@router.post("/keys/status")
async def key_status(profile_name: str = "default"):
    """Check which API keys are configured for a profile."""
    openai_key = load_api_key(profile_name, "openai")
    stability_key = load_api_key(profile_name, "stability")
    return KeyStatusResponse(
        openai_configured=openai_key is not None,
        stability_configured=stability_key is not None,
    )


@router.post("/keys/delete")
async def delete_key(req: DeleteKeyRequest):
    """Delete a stored API key."""
    if req.service not in ("openai", "stability"):
        raise HTTPException(status_code=400, detail="Service must be 'openai' or 'stability'")
    delete_api_key(req.profile_name, req.service)
    return {"status": "deleted", "service": req.service, "profile": req.profile_name}


# --- Project Creation with Page Planning ---

@router.post("/projects/create", response_model=CreateProjectResponse)
async def create_project(req: CreateProjectRequest):
    """
    Create a new book project.
    Uses GPT-4.1 to generate a page plan based on the description.
    The heavy work runs as a background job.
    """
    # Check API key availability
    openai_key = load_api_key(req.profile_name, "openai")
    if openai_key is None:
        raise HTTPException(
            status_code=400,
            detail="OpenAI API key not configured. Save your key first via /api/v1/keys/save",
        )

    # Enqueue the book plan generation job
    payload = {
        "description": req.description,
        "book_type": req.book_type,
        "page_count": req.page_count,
        "author_name": req.author_name,
    }
    job = enqueue_job("generate_book_plan", payload, profile_name=req.profile_name)

    return CreateProjectResponse(
        project_id=job.id,
        job_id=job.id,
        message="Book project creation has been queued. Check status via /api/v1/jobs/{job_id}",
        status="queued",
    )


# --- Job Status ---

@router.get("/jobs/{job_id}", response_model=JobStatusResponse)
async def get_job_status(job_id: str):
    """Get the status of a background job."""
    job = get_job(job_id)
    if job is None:
        raise HTTPException(status_code=404, detail=f"Job {job_id} not found")
    return JobStatusResponse(
        job_id=job.id,
        job_type=job.job_type,
        status=job.status,
        progress=job.progress,
        result=job.result,
        error=job.error,
        created_at=job.created_at,
        updated_at=job.updated_at,
    )


@router.get("/jobs")
async def list_all_jobs(status: Optional[str] = None, limit: int = 20):
    """List background jobs, optionally filtered by status."""
    jobs = list_jobs(status=status, limit=limit)
    return {
        "count": len(jobs),
        "jobs": [
            JobStatusResponse(
                job_id=j.id,
                job_type=j.job_type,
                status=j.status,
                progress=j.progress,
                result=j.result,
                error=j.error,
                created_at=j.created_at,
                updated_at=j.updated_at,
            )
            for j in jobs
        ],
    }


# --- Direct Page Planning (sync, for testing) ---

class PlanBookRequest(BaseModel):
    profile_name: str = Field(default="default")
    description: str = Field(..., description="Book description")
    book_type: Optional[str] = None
    page_count: Optional[int] = None
    author_name: Optional[str] = None


@router.post("/planner/plan")
async def plan_book_sync(req: PlanBookRequest):
    """
    Synchronously generate a book plan using GPT-4.1.
    Useful for previewing before committing to a full project.
    """
    openai_key = load_api_key(req.profile_name, "openai")
    if openai_key is None:
        raise HTTPException(
            status_code=400,
            detail="OpenAI API key not configured. Save your key first via /api/v1/keys/save",
        )

    try:
        plan = generate_book_plan(
            openai_api_key=openai_key,
            user_description=req.description,
            book_type=req.book_type,
            page_count=req.page_count,
            author_name=req.author_name,
        )
        return {"status": "success", "plan": plan.to_dict()}
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        logger.exception("Failed to generate book plan")
        raise HTTPException(status_code=500, detail=f"Planning failed: {str(e)}")


# --- Image Generation ---

@router.post("/images/generate", response_model=GenerateImageResponse)
async def generate_image(req: GenerateImageRequest):
    """
    Generate an image using SDXL.
    Supports standard illustrations and coloring book mode.
    Can run synchronously or as a background job.
    """
    # Validate trim size
    if req.trim_size not in KDP_TRIM_SIZES:
        valid_sizes = ", ".join(KDP_TRIM_SIZES.keys())
        raise HTTPException(
            status_code=400,
            detail=f"Invalid trim size '{req.trim_size}'. Valid sizes: {valid_sizes}",
        )

    # Check API key availability
    stability_key = load_api_key(req.profile_name, "stability")
    if stability_key is None:
        raise HTTPException(
            status_code=400,
            detail="Stability AI API key not configured. Save your key first via /api/v1/keys/save",
        )

    # Async mode: queue as background job
    if req.async_mode:
        payload = {
            "prompt": req.prompt,
            "trim_size": req.trim_size,
            "is_coloring": req.is_coloring,
            "needs_resize": req.needs_resize,
        }
        job = enqueue_job("generate_image", payload, profile_name=req.profile_name)
        return GenerateImageResponse(
            status="queued",
            is_coloring=req.is_coloring,
            job_id=job.id,
        )

    # Sync mode: generate immediately
    try:
        result = generate_image_sync(
            stability_api_key=stability_key,
            prompt=req.prompt,
            trim_size=req.trim_size,
            is_coloring=req.is_coloring,
            needs_resize=req.needs_resize,
        )

        if result.error:
            return GenerateImageResponse(
                status="error",
                error=result.error,
                is_coloring=req.is_coloring,
            )

        return GenerateImageResponse(
            status="success",
            image_path=result.image_path,
            width=result.width,
            height=result.height,
            is_coloring=result.is_coloring,
        )
    except Exception as e:
        logger.exception("Image generation failed")
        return GenerateImageResponse(
            status="error",
            error=str(e),
            is_coloring=req.is_coloring,
        )


@router.get("/images/sizes")
async def list_trim_sizes():
    """List available KDP trim sizes."""
    return {
        "sizes": [
            {"key": k, "width_inches": v[0] / 72, "height_inches": v[1] / 72}
            for k, v in KDP_TRIM_SIZES.items()
        ]
    }