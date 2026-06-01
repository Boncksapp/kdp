"""Application configuration using environment variables."""

import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    APP_NAME: str = "KDP Book Generator Studio"
    APP_VERSION: str = "0.1.0"

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./kdp_studio.db")

    # Encryption — master key for encrypting user API keys
    # Generate with: python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
    ENCRYPTION_KEY: str = os.getenv(
        "ENCRYPTION_KEY",
        "Qb8CINYxfBx13AVq9kwhWs8oJ3HPq2Benmn8HY22Mvg="  # default test key
    )

    # Background job queue (simple file-based for now)
    JOB_QUEUE_PATH: str = os.getenv("JOB_QUEUE_PATH", "/home/agent-backend-dev/jobs")

    # Rate limiting
    MAX_PROJECTS_PER_USER: int = int(os.getenv("MAX_PROJECTS_PER_USER", "50"))


settings = Settings()
