"""
SDXL Image Generation Service for KDP Book Generator Studio.
Generates illustrations and covers using Stability AI's SDXL API.

Features:
- High-quality SDXL image generation from text prompts
- Coloring Book Mode: strict B&W, thick outlines, line art, no gradients
- Auto-resizing images for KDP trim size requirements
- Integration with background job queue
"""

import io
import json
import logging
import os
import uuid
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import Optional

import httpx
from PIL import Image, ImageOps

logger = logging.getLogger(__name__)

# ── Constants ───────────────────────────────────────────────────────

# Stability AI API base URL
STABILITY_API_BASE = "https://api.stability.ai/v2beta/stable-image/generate"

# KDP standard trim sizes (points, 1pt = 1/72 inch)
KDP_TRIM_SIZES = {
    "6x9": (432, 648),       # 6" x 9"
    "5.5x8.5": (396, 612),   # 5.5" x 8.5"
    "6x8": (432, 576),       # 6" x 8"
    "7.5x9.25": (540, 666),  # 7.5" x 9.25"
    "8x10": (576, 720),      # 8" x 10"
    "8.5x11": (612, 792),    # 8.5" x 11"
    "7x10": (504, 720),      # 7" x 10"
}

# Output directory for generated images
OUTPUT_DIR = Path("/home/agent-backend-dev/generated_images")


# ── Data Models ─────────────────────────────────────────────────────

@dataclass
class ImageGenerationResult:
    prompt: str = ""
    image_path: str = ""
    image_format: str = "png"
    width: int = 0
    height: int = 0
    is_coloring: bool = False
    job_id: str = ""
    error: Optional[str] = None


# ── Helper Functions ─────────────────────────────────────────────────

def _ensure_output_dir():
    """Ensure the output directory exists."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def _get_image_path(prefix: str = "img") -> str:
    """Generate a unique image file path."""
    _ensure_output_dir()
    filename = f"{prefix}_{uuid.uuid4().hex[:12]}.png"
    return str(OUTPUT_DIR / filename)


def resize_for_kdp(image_path: str, trim_size: str = "6x9", bleed: bool = False) -> str:
    """
    Resize an image to fit within KDP trim size requirements.
    Maintains aspect ratio and centers the image on a canvas of the target size.

    Args:
        image_path: Path to the source image.
        trim_size: KDP trim size key (e.g., "6x9", "8.5x11").
        bleed: Whether to add 0.125" bleed.

    Returns:
        Path to the resized image.
    """
    if trim_size not in KDP_TRIM_SIZES:
        logger.warning(f"Unknown trim size '{trim_size}', defaulting to 6x9")
        trim_size = "6x9"

    target_w, target_h = KDP_TRIM_SIZES[trim_size]

    # Add bleed if needed (0.125" = 9pt)
    if bleed:
        target_w += 9
        target_h += 18  # 0.125" top + 0.125" bottom

    img = Image.open(image_path)

    # Convert to RGB if needed
    if img.mode not in ("RGB", "L"):
        img = img.convert("RGB")

    # Calculate scaling to fit within target dimensions
    img_w, img_h = img.size
    scale = min(target_w / img_w, target_h / img_h)
    new_w = int(img_w * scale)
    new_h = int(img_h * scale)

    # Resize image
    img_resized = img.resize((new_w, new_h), Image.LANCZOS)

    # Create target canvas and paste resized image centered
    canvas = Image.new("RGB", (target_w, target_h), (255, 255, 255))
    x_offset = (target_w - new_w) // 2
    y_offset = (target_h - new_h) // 2
    canvas.paste(img_resized, (x_offset, y_offset))

    output_path = image_path.replace(".png", "_kdp.png")
    canvas.save(output_path, "PNG")
    logger.info(f"Resized image to {target_w}x{target_h}: {output_path}")

    return output_path


def apply_coloring_mode(image_path: str) -> str:
    """
    Apply strict coloring book mode transformations:
    - Convert to grayscale (black & white)
    - Enhance contrast for thick outlines
    - Remove any gradients
    - Ensure line-art style

    Args:
        image_path: Path to the source image.

    Returns:
        Path to the coloring-mode processed image.
    """
    img = Image.open(image_path)

    # Convert to grayscale
    img_gray = img.convert("L")

    # Apply high contrast threshold to create thick outlines
    # Use dithering for a more "line art" look
    img_bw = img_gray.point(lambda x: 0 if x < 128 else 255, "1")

    # Convert back to L mode for saving
    img_bw = img_bw.convert("L")

    output_path = image_path.replace(".png", "_coloring.png")
    img_bw.save(output_path, "PNG")
    logger.info(f"Applied coloring book mode: {output_path}")

    return output_path


# ── SDXL Image Generation ───────────────────────────────────────────

def generate_image(
    stability_api_key: str,
    prompt: str,
    image_format: str = "png",
    style: str = "enhance",
    is_coloring: bool = False,
    negative_prompt: Optional[str] = None,
    cfg_scale: float = 7.0,
    seed: int = 0,
) -> ImageGenerationResult:
    """
    Generate an image using Stability AI SDXL.

    Args:
        stability_api_key: Stability AI API key.
        prompt: The text prompt for image generation.
        image_format: Output format ('png' or 'webp').
        style: Generation style preset.
        is_coloring: If True, applies coloring book mode settings.
        negative_prompt: Things to avoid in the image.
        cfg_scale: How strongly to follow the prompt (1-20).
        seed: Random seed (0 = random).

    Returns:
        ImageGenerationResult with image path or error.
    """
    result = ImageGenerationResult(
        prompt=prompt,
        image_format=image_format,
        is_coloring=is_coloring,
        job_id=uuid.uuid4().hex[:12],
    )

    # Build the prompt with coloring book instructions
    final_prompt = prompt
    if is_coloring:
        # Ensure the prompt specifies coloring book style
        # Remove any color references and enforce B&W line art
        if "SDXL:" in final_prompt:
            final_prompt = final_prompt.replace("SDXL:", "").strip()
        final_prompt = (
            f"{final_prompt}, coloring book style, "
            f"black and white line art, thick outlines, "
            f"no gradients, no shading, white background, "
            f"clear bold lines, simple shapes, high contrast"
        )

    try:
        # Build the API request
        headers = {
            "Authorization": f"Bearer {stability_api_key}",
            "Accept": "image/*",
        }

        payload = {
            "prompt": final_prompt,
            "output_format": image_format,
            "style_preset": style,
            "cfg_scale": cfg_scale,
            "seed": seed,
        }

        if negative_prompt:
            payload["negative_prompt"] = negative_prompt

        if is_coloring:
            payload["samples"] = 1
            payload["aspect_ratio"] = "1:1"  # Square works best for coloring pages

        # Make the API call to Stability AI
        response = httpx.post(
            f"{STABILITY_API_BASE}/sd3",
            headers=headers,
            data=payload,
            timeout=120.0,
        )

        if response.status_code != 200:
            error_detail = response.text[:500]
            logger.error(f"SDXL API error {response.status_code}: {error_detail}")
            result.error = f"API error {response.status_code}: {error_detail}"
            return result

        # Save the image
        image_path = _get_image_path("sdxl")
        with open(image_path, "wb") as f:
            f.write(response.content)

        # Get image dimensions
        with Image.open(image_path) as img:
            result.width, result.height = img.size

        result.image_path = image_path

        # Apply coloring book mode if requested
        if is_coloring:
            coloring_path = apply_coloring_mode(image_path)
            result.image_path = coloring_path

        logger.info(f"Image generated: {result.image_path} ({result.width}x{result.height})")
        return result

    except httpx.TimeoutException:
        logger.error("SDXL API request timed out")
        result.error = "API request timed out after 120 seconds"
        return result
    except Exception as e:
        logger.exception(f"Image generation failed: {e}")
        result.error = str(e)
        return result


def generate_image_sync(
    stability_api_key: str,
    prompt: str,
    trim_size: str = "6x9",
    is_coloring: bool = False,
    needs_resize: bool = True,
) -> ImageGenerationResult:
    """
    Full image generation pipeline: generate + resize + colorize.

    Args:
        stability_api_key: Stability AI API key.
        prompt: SDXL text prompt.
        trim_size: KDP trim size for final image.
        is_coloring: Enable coloring book mode.
        needs_resize: Resize for KDP layout after generation.

    Returns:
        ImageGenerationResult with final image path.
    """
    # Step 1: Generate the image
    result = generate_image(
        stability_api_key=stability_api_key,
        prompt=prompt,
        is_coloring=is_coloring,
    )

    if result.error:
        return result

    # Step 2: Resize for KDP if needed
    if needs_resize and result.image_path:
        resized_path = resize_for_kdp(result.image_path, trim_size)
        result.image_path = resized_path

    return result


__all__ = [
    "ImageGenerationResult",
    "generate_image",
    "generate_image_sync",
    "resize_for_kdp",
    "apply_coloring_mode",
    "KDP_TRIM_SIZES",
]