# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development server (runs on port 3001 with Turbopack)
npm run dev

# Production build and start
npm run build
npm start

# Code quality
npm run lint              # ESLint
npm run format           # Prettier formatting
npm run lint-staged     # Pre-commit linting

# Database types generation
npm run generate-types   # Generate Supabase TypeScript types
```

## Architecture Overview

This is a **Next.js 15 personal portfolio/blog** using the App Router with the following architecture:

### Core Tech Stack
- **Framework**: Next.js 15 with TypeScript and App Router
- **Database**: Supabase (PostgreSQL) with auth
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Rich Text**: Plate.js v48 with 40+ plugins for comprehensive editing
- **State Management**: TanStack Query v5 for server state
- **AI Features**: AI SDK with OpenAI integration
- **File Uploads**: UploadThing
- **Deployment**: Fly.io with Docker

### App Router Structure
- **`(account)/`** - Auth routes (login, callback)
- **`(authenticated)/`** - Protected routes (composer for content creation)
- **`(menu)/`** - Public routes (blog, dev posts, timeline, video)
- **`api/`** - Backend API routes for content CRUD and AI features
- **`editor/`** - Standalone rich text editor

### Key Components Architecture
- **`/src/components/ui/`** - 70+ shadcn/ui components
- **`/src/components/editor/`** - Multiple Plate.js editor variants:
  - `create-editor` - New content creation
  - `edit-editor` - Content editing
  - `markdown-editor` - Markdown-focused editing
  - `read-only-editor` - Display-only mode
- **`/src/utils/supabase/`** - Database clients (client, server, middleware)
- **`/src/hooks/`** - TanStack Query hooks for data fetching

### Content Management System
- **Blog posts**: Stored in Supabase `blog` table
- **Dev posts**: Stored in Supabase `dev` table  
- **Rich text editing**: Plate.js with AI copilot, markdown import/export
- **Authentication**: Supabase Auth protects `/composer` route
- **Media uploads**: UploadThing integration for images/files

### API Routes
- `/api/create-content` - Create new blog/dev posts
- `/api/update-content` - Edit existing posts
- `/api/get-content[s]` - Fetch posts for display
- `/api/delete-content` - Remove posts
- `/api/ai/copilot` - AI writing assistance
- `/api/ai/command` - AI commands for editor
- `/api/uploadthing` - File upload handling

## Development Guidelines

### Environment Setup
Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY` (for AI features)
- `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`

### Database Schema
Run `npm run generate-types` after Supabase schema changes to update TypeScript types. The command connects to project ID `pbwcnkdijuhpbpjifxsl`.

### Code Quality
- Husky git hooks enforce conventional commits
- Lint-staged runs ESLint and Prettier on staged files
- Use existing shadcn/ui components before creating new ones
- Follow Plate.js patterns for editor extensions

### Content Creation Flow
1. Auth required to access `/composer`
2. Create/edit content using Plate.js editors
3. Content saved to Supabase via API routes
4. TanStack Query manages client-side state and caching
5. Public routes display content for all users