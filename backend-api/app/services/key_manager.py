from __future__ import annotations

import hashlib
import base64
import os
from pathlib import Path
from typing import Optional

from cryptography.fernet import Fernet

from app.config import settings

# In-memory cache for profile-level Fernet instances
_profile_fernets: dict[str, Fernet] = {}


def _get_master_key() -> bytes:
    """Get the base64-decoded master key."""
    return settings.ENCRYPTION_KEY.encode("utf-8")


def _profile_fernet(profile_name: str) -> Fernet:
    """Derive a per-profile Fernet key using SHA-256 of (master_key + profile_name)."""
    if profile_name not in _profile_fernets:
        master = _get_master_key()
        # Derive a 32-byte key using SHA-256
        raw = hashlib.sha256(master + profile_name.encode("utf-8")).digest()
        fernet_key = base64.urlsafe_b64encode(raw)
        _profile_fernets[profile_name] = Fernet(fernet_key)
    return _profile_fernets[profile_name]


def encrypt_api_key(profile_name: str, api_key: str) -> str:
    """Encrypt an API key for a given profile."""
    f = _profile_fernet(profile_name)
    return f.encrypt(api_key.encode("utf-8")).decode("utf-8")


def decrypt_api_key(profile_name: str, encrypted_key: str) -> str:
    """Decrypt an API key for a given profile."""
    f = _profile_fernet(profile_name)
    return f.decrypt(encrypted_key.encode("utf-8")).decode("utf-8")


# --- File-based key storage ---

_KEYS_DIR = Path(settings.JOB_QUEUE_PATH) / "api_keys"


def _ensure_keys_dir():
    _KEYS_DIR.mkdir(parents=True, exist_ok=True)


def save_api_key(profile_name: str, service: str, api_key: str) -> None:
    """Encrypt and persist an API key to disk."""
    _ensure_keys_dir()
    encrypted = encrypt_api_key(profile_name, api_key)
    key_file = _KEYS_DIR / f"{profile_name}_{service}.enc"
    key_file.write_text(encrypted)


def load_api_key(profile_name: str, service: str) -> Optional[str]:
    """Load and decrypt an API key from disk."""
    key_file = _KEYS_DIR / f"{profile_name}_{service}.enc"
    if not key_file.exists():
        return None
    encrypted = key_file.read_text().strip()
    return decrypt_api_key(profile_name, encrypted)


def delete_api_key(profile_name: str, service: str) -> None:
    """Remove a stored API key."""
    key_file = _KEYS_DIR / f"{profile_name}_{service}.enc"
    if key_file.exists():
        key_file.unlink()


__all__ = [
    "encrypt_api_key",
    "decrypt_api_key",
    "save_api_key",
    "load_api_key",
    "delete_api_key",
]