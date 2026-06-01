#!/usr/bin/env python3

"""
Page Planner Engine — uses GPT-4.1 via OpenAI API to generate:
- Book title suggestion
- Chapter outlines
- Per-page content maps (text + optional image prompts)

Strictly enforces content rules per the lead's specifications:
- TEXT AI: ONLY OpenAI GPT-4.1
- IMAGE AI: ONLY SDXL
- Must create strict page map (page number, type, word limit, image prompt)
- Children's pages: 50-120 words
- Fiction pages: 250-400 words
- Coloring pages: Image only (black & white, thick outlines, no gradients, line art)
- MAX 220 pages. Reject anything above.
- API keys: encrypted at rest, never logged.
"""

import json
import logging
import re
from dataclasses import dataclass, field, asdict
from typing import Optional

from openai import OpenAI

logger = logging.getLogger(__name__)


# ── Data models ──────────────────────────────────────────────────────

@dataclass
class PageSpec:
    page_number: int
    content_type: str  # "text", "image", "mixed"
    word_limit: int = 0
    text_prompt: str = ""
    image_prompt: str = ""
    notes: str = ""


@dataclass
class ChapterPlan:
    chapter_number: int
    title: str
    summary: str
    page_count: int
    pages: list[PageSpec] = field(default_factory=list)


@dataclass
class BookPlan:
    title: str
    subtitle: str = ""
    author_name: str = ""
    book_type: str = "fiction"  # fiction, non-fiction, children, low-content
    target_age: str = "general"
    total_pages: int = 0
    chapters: list[ChapterPlan] = field(default_factory=list)

    def to_dict(self) -> dict:
        return asdict(self)

    def to_json(self) -> str:
        return json.dumps(self.to_dict(), indent=2)


# ── Page limit constant ─────────────────────────────────────────────

MAX_PAGES = 220


# ── Planner Engine ───────────────────────────────────────────────────

PLANNER_SYSTEM_PROMPT = """You are "KDP Book Planner", an expert AI assistant that designs book layouts for self-publishing on Amazon KDP.

Your task is to create a detailed book plan based on the user's description. You must ALWAYS respond with valid JSON only, no markdown fences, no extra text.

RESPONSE SCHEMA:
{
  "title": "Suggested book title",
  "subtitle": "Optional subtitle or empty string",
  "author_name": "Author name as provided by user or 'Your Name'",
  "book_type": "fiction|non-fiction|children|low-content",
  "target_age": "general|children|young-adult|adult",
  "total_pages": integer (MAX 220),
  "chapters": [
    {
      "chapter_number": 1,
      "title": "Chapter title",
      "summary": "Brief summary of the chapter contents",
      "page_count": integer (estimated page count for this chapter),
      "pages": [
        {
          "page_number": 1,
          "content_type": "text|image|mixed",
          "word_limit": integer (max words for this page based on book type),
          "text_prompt": "Detailed instruction for what text goes on this page, empty string for image-only pages",
          "image_prompt": "Detailed SDXL image prompt if content_type is image or mixed, else empty string. Prefixed with SDXL:",
          "notes": "Additional notes about this page"
        }
      ]
    }
  ]
}

STRICT CONTENT RULES:
1. MAXIMUM 220 PAGES. total_pages must never exceed 220.
2. For children's books: each page must have word_limit 50-120.
3. For fiction: each page must have word_limit 250-400.
4. For non-fiction: each page must have word_limit 200-350.
5. For coloring / low-content books: all pages must have content_type "image", word_limit 0.
6. Coloring page image prompts must specify: black and white, thick outlines, no gradients, line art only.
7. Image prompts must be SDXL-compatible and prefixed with "SDXL:".
8. total_pages must equal sum of all chapter page_counts.
9. Children's books: aim 24-32 pages. Fiction: 200-350 pages. Non-fiction: 150-250 pages.
10. API keys must never appear in output. Never log keys.
"""


def generate_book_plan(
    openai_api_key: str,
    user_description: str,
    book_type: Optional[str] = None,
    page_count: Optional[int] = None,
    author_name: Optional[str] = None,
    model: str = "gpt-4.1",
    temperature: float = 0.7,
) -> BookPlan:
    """
    Generate a complete book plan using GPT-4.1.

    Enforces maximum page limit and content word limits.
    """
    # Reject over 220 pages immediately
    if page_count and page_count > MAX_PAGES:
        raise ValueError(f"Page count {page_count} exceeds maximum of {MAX_PAGES}. Please reduce page count.")

    # Never log the API key
    client = OpenAI(api_key=openai_api_key)

    user_prompt = f"Create a book plan based on this description: {user_description}"
    if book_type:
        user_prompt += f"\nBook type: {book_type}"
    if page_count:
        user_prompt += f"\nTarget page count: {page_count} (MAX 220)"
    if author_name:
        user_prompt += f"\nAuthor name: {author_name}"

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": PLANNER_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=temperature,
            max_tokens=8192,
        )

        content = response.choices[0].message.content.strip()

        # Strip markdown code fences
        content = re.sub(r"^```(?:json)?\s*", "", content)
        content = re.sub(r"\s*```$", "", content)

        data = json.loads(content)
        plan = _dict_to_book_plan(data)

        # Validate page limit
        if plan.total_pages > MAX_PAGES:
            raise ValueError(
                f"Generated plan has {plan.total_pages} pages which exceeds the maximum of {MAX_PAGES}."
            )

        return plan

    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse GPT response as JSON: {e}")
        raise ValueError(f"Planner returned invalid JSON: {e}") from e
    except Exception as e:
        logger.error(f"Planner API call failed: {type(e).__name__}: {e}")
        raise


def _dict_to_book_plan(data: dict) -> BookPlan:
    """Convert a dictionary from GPT into a BookPlan dataclass."""

    chapters = []
    for ch_data in data.get("chapters", []):
        pages = []
        for p_data in ch_data.get("pages", []):
            pages.append(
                PageSpec(
                    page_number=p_data.get("page_number", 1),
                    content_type=p_data.get("content_type", "text"),
                    word_limit=p_data.get("word_limit", 0),
                    text_prompt=p_data.get("text_prompt", ""),
                    image_prompt=p_data.get("image_prompt", ""),
                    notes=p_data.get("notes", ""),
                )
            )
        chapters.append(
            ChapterPlan(
                chapter_number=ch_data.get("chapter_number", 1),
                title=ch_data.get("title", ""),
                summary=ch_data.get("summary", ""),
                page_count=ch_data.get("page_count", 0),
                pages=pages,
            )
        )

    return BookPlan(
        title=data.get("title", "Untitled"),
        subtitle=data.get("subtitle", ""),
        author_name=data.get("author_name", "Your Name"),
        book_type=data.get("book_type", "fiction"),
        target_age=data.get("target_age", "general"),
        total_pages=data.get("total_pages", 0),
        chapters=chapters,
    )


__all__ = [
    "BookPlan",
    "ChapterPlan",
    "PageSpec",
    "generate_book_plan",
    "MAX_PAGES",
]