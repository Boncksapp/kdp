"""
Simple background job queue for async book generation.
Uses a JSON-based queue file with status tracking.

Job lifecycle: queued → running → done / failed
"""

import json
import logging
import os
import time
import uuid
from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable, Optional

from app.config import settings

logger = logging.getLogger(__name__)

QUEUE_DIR = Path(settings.JOB_QUEUE_PATH)


# ── Job Model ────────────────────────────────────────────────────────

@dataclass
class Job:
    id: str = ""
    job_type: str = ""  # "generate_book_plan", "generate_text", "generate_image", "export_book"
    status: str = "queued"  # queued | running | done | failed
    progress: float = 0.0  # 0.0 - 1.0
    payload: dict = field(default_factory=dict)
    result: Optional[dict] = None
    error: Optional[str] = None
    created_at: str = ""
    updated_at: str = ""
    profile_name: str = "default"

    def __post_init__(self):
        if not self.id:
            self.id = str(uuid.uuid4())
        if not self.created_at:
            self.created_at = datetime.now(timezone.utc).isoformat()
        if not self.updated_at:
            self.updated_at = self.created_at


# ── Queue File Helpers ───────────────────────────────────────────────

def _ensure_queue_dir():
    QUEUE_DIR.mkdir(parents=True, exist_ok=True)


def _job_path(job_id: str) -> Path:
    return QUEUE_DIR / f"job_{job_id}.json"


def enqueue_job(job_type: str, payload: dict, profile_name: str = "default") -> Job:
    """Create a new job and persist it to the queue directory."""
    _ensure_queue_dir()
    job = Job(
        job_type=job_type,
        payload=payload,
        profile_name=profile_name,
    )
    job_path = _job_path(job.id)
    job_path.write_text(json.dumps(asdict(job), indent=2))
    logger.info(f"Enqueued job {job.id} of type {job_type}")
    return job


def get_job(job_id: str) -> Optional[Job]:
    """Get a job by ID."""
    job_path = _job_path(job_id)
    if not job_path.exists():
        return None
    data = json.loads(job_path.read_text())
    return Job(**data)


def update_job(job_id: str, **kwargs) -> Optional[Job]:
    """Update job fields and persist."""
    job = get_job(job_id)
    if job is None:
        return None
    for key, value in kwargs.items():
        if hasattr(job, key):
            setattr(job, key, value)
    job.updated_at = datetime.now(timezone.utc).isoformat()
    _job_path(job_id).write_text(json.dumps(asdict(job), indent=2))
    return job


def list_jobs(status: Optional[str] = None, limit: int = 20) -> list[Job]:
    """List jobs, optionally filtered by status."""
    _ensure_queue_dir()
    jobs = []
    for f in sorted(QUEUE_DIR.glob("job_*.json"), reverse=True):
        data = json.loads(f.read_text())
        job = Job(**data)
        if status is None or job.status == status:
            jobs.append(job)
            if len(jobs) >= limit:
                break
    return jobs


# ── Job Runner ──────────────────────────────────────────────────────

class JobRunner:
    """Simple synchronous job runner. For production, replace with Celery/Redis Queue."""

    def __init__(self):
        self._handlers: dict[str, Callable] = {}

    def register(self, job_type: str, handler: Callable):
        """Register a handler function for a job type."""
        self._handlers[job_type] = handler

    def process_next(self) -> Optional[str]:
        """Process the next queued job. Returns job_id or None."""
        for job in list_jobs(status="queued", limit=1):
            return self._run_job(job)
        return None

    def process_all(self) -> int:
        """Process all queued jobs. Returns count processed."""
        count = 0
        while True:
            job_id = self.process_next()
            if job_id is None:
                break
            count += 1
        return count

    def _run_job(self, job: Job) -> str:
        """Execute a single job."""
        update_job(job.id, status="running", progress=0.1)

        handler = self._handlers.get(job.job_type)
        if handler is None:
            update_job(job.id, status="failed", error=f"No handler for job type: {job.job_type}")
            return job.id

        try:
            result = handler(job)
            update_job(job.id, status="done", progress=1.0, result=result)
            logger.info(f"Job {job.id} completed successfully")
        except Exception as e:
            logger.exception(f"Job {job.id} failed: {e}")
            update_job(job.id, status="failed", error=str(e))

        return job.id


# Global runner instance
runner = JobRunner()


__all__ = [
    "Job",
    "enqueue_job",
    "get_job",
    "update_job",
    "list_jobs",
    "JobRunner",
    "runner",
]