"""
KDP Book Generator Studio — Backend API Server
FastAPI application with encrypted API key storage, GPT-4.1 page planning,
SDXL image generation, and background job queue.
"""

import json
import logging
import os
import threading
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes.api import router
from app.services.job_queue import runner, enqueue_job, get_job, update_job
from app.services.key_manager import load_api_key
from app.services.page_planner import generate_book_plan
from app.services.image_gen import generate_image_sync

# ── Logging ──────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(settings.APP_NAME)


# ── Job Handlers ─────────────────────────────────────────────────────

def handle_generate_book_plan(job):
    """Generate a book plan using GPT-4.1."""
    payload = job.payload
    profile_name = job.profile_name

    # Load the user's API key
    openai_key = load_api_key(profile_name, "openai")
    if not openai_key:
        raise RuntimeError(f"No OpenAI API key found for profile '{profile_name}'")

    # Generate the plan
    plan = generate_book_plan(
        openai_api_key=openai_key,
        user_description=payload.get("description", ""),
        book_type=payload.get("book_type"),
        page_count=payload.get("page_count"),
        author_name=payload.get("author_name"),
    )

    return plan.to_dict()


# Register handlers
runner.register("generate_book_plan", handle_generate_book_plan)


def handle_generate_image(job):
    """Generate an image using SDXL."""
    payload = job.payload
    profile_name = job.profile_name

    # Load the Stability AI key
    stability_key = load_api_key(profile_name, "stability")
    if not stability_key:
        raise RuntimeError(f"No Stability AI API key found for profile '{profile_name}'")

    # Generate the image
    result = generate_image_sync(
        stability_api_key=stability_key,
        prompt=payload.get("prompt", ""),
        trim_size=payload.get("trim_size", "6x9"),
        is_coloring=payload.get("is_coloring", False),
        needs_resize=payload.get("needs_resize", True),
    )

    if result.error:
        raise RuntimeError(result.error)

    return {
        "image_path": result.image_path,
        "width": result.width,
        "height": result.height,
        "is_coloring": result.is_coloring,
        "prompt": result.prompt,
    }


runner.register("generate_image", handle_generate_image)


# ── Background Worker ────────────────────────────────────────────────

def _background_worker():
    """Simple background thread that processes queued jobs."""
    logger.info("Background job worker started")
    while True:
        try:
            # Check for queued jobs every 2 seconds
            processed = runner.process_all()
            if processed:
                logger.info(f"Processed {processed} job(s)")
        except Exception as e:
            logger.exception(f"Worker error: {e}")
        time.sleep(2)


# ── App Lifespan ─────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    logger.info(f"Starting {settings.APP_NAME} v{settings.APP_VERSION}")

    # Ensure job queue directory exists
    os.makedirs(settings.JOB_QUEUE_PATH, exist_ok=True)

    # Start background worker thread
    worker_thread = threading.Thread(target=_background_worker, daemon=True)
    worker_thread.start()
    logger.info("Background worker thread started")

    yield

    logger.info("Shutting down...")


# ── FastAPI Application ──────────────────────────────────────────────

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

# CORS — allow all origins during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API routes
app.include_router(router)


# ── Main Entry Point ─────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )