## Project Summary
A SaaS product that generates AI-powered images, captions, and hashtags based on user input/ideas. It leverages Google's Gemini AI for text generation and Pollinations.ai for image generation.

## Tech Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: Radix UI, Lucide React
- AI: @google/genai (Gemini), Pollinations.ai
- Motion: Framer Motion

## Architecture
- `src/app/api/generate`: Server-side API route for calling Gemini.
- `src/app/page.tsx`: Main interface for user input and result display.
- `src/components`: UI components (Button, Input, Card, etc.).

## User Preferences
- Use Gemini free API key.
- Attractive and modern interface.
- Automatic generation of image, caption, and hashtags.

## Project Guidelines
- Follow Next.js App Router conventions.
- Use functional components and named exports.
- Minimize 'use client' by wrapping interactive elements.
- No comments unless requested.

## Common Patterns
- API routes use standard Request/Response objects.
- Framer Motion for entrance animations.
- Zod for input validation.
