/**
 * KDP Studio Backend API Bridge
 * 
 * This directory contains the Python FastAPI backend that powers:
 * 1. Encrypted API key storage (Fernet AES-128)
 * 2. GPT-4.1 Page Planner Engine
 * 3. Background job queue
 * 4. SDXL image generation pipeline
 * 
 * ## Architecture
 * 
 * backend-api/app/
 *   main.py              — FastAPI application entry point
 *   config.py            — Environment-based configuration
 *   routes/api.py        — REST API endpoints
 *   services/
 *     key_manager.py     — Encrypted storage for OpenAI/SDXL keys
 *     page_planner.py    — GPT-4.1 book planning engine
 *     job_queue.py       — Background job processing
 *     image_gen.py       — SDXL image generation (future)
 * 
 * ## Running
 * 
 * cd backend-api
 * python3 -m venv venv
 * source venv/bin/activate
 * pip install -r requirements.txt
 * uvicorn app.main:app --host 0.0.0.0 --port 8000
 * 
 * ## Integration with Next.js
 * 
 * The Next.js frontend in ../app/ calls the Python API through:
 * - Server-side fetch in Next.js API routes (app/api/books/route.ts)
 * - Direct client calls from the dashboard
 * 
 * ## Content Rules Enforced
 * 
 * - TEXT AI: OpenAI GPT-4.1 only
 * - IMAGE AI: SDXL only
 * - Children's pages: 50-120 words
 * - Fiction pages: 250-400 words
 * - Coloring pages: Image only, black & white, thick outlines
 * - Maximum 220 pages per project
 * - API keys encrypted at rest, never logged
 */

export {};