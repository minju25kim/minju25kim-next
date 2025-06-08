---
description: 
globs: 
alwaysApply: true
---
# Project Structure Guide

This project is a Next.js app using TypeScript, Tailwind CSS, shadcn/ui, and Fly.io for deployment. The main entry point is [src/app/layout.tsx](mdc:src/app/layout.tsx), which wraps all pages and provides global layout, theming, and navigation. The landing page is [src/app/page.tsx](mdc:src/app/page.tsx).

## Key Directories
- **[src/app/](mdc:src/app)**: Main application pages and routing. Includes:
  - [layout.tsx](mdc:src/app/layout.tsx): Root layout for all pages
  - [page.tsx](mdc:src/app/page.tsx): Main landing page
  - [not-found.tsx](mdc:src/app/not-found.tsx): 404 page
  - [editor/page.tsx](mdc:src/app/editor/page.tsx): Editor page
  - (menu), (account), (authenticated): Route groups for different sections
  - [api/](mdc:src/app/api): API route handlers
- **[src/components/](mdc:src/components)**: Shared React components, including:
  - [providers.tsx](mdc:src/components/providers.tsx): App-wide context providers
  - [footer.tsx](mdc:src/components/footer.tsx): Footer component
  - [GoogleAnalytics.tsx](mdc:src/components/GoogleAnalytics.tsx): Analytics integration
  - [editor/](mdc:src/components/editor): Editor-related components
  - [ui/](mdc:src/components/ui): Shared UI components
- **[src/lib/](mdc:src/lib)**: Utility libraries and core logic
- **[src/store/](mdc:src/store)**: State management
- **[src/hooks/](mdc:src/hooks)**: Custom React hooks
- **[src/utils/](mdc:src/utils)**: Utility/helper functions, including Supabase integration

## Theming
The app uses [next-themes](mdc:package.json) for light/dark mode, managed in [providers.tsx](mdc:src/components/providers.tsx).

## Analytics
Google Analytics is set up via [GoogleAnalytics.tsx](mdc:src/components/GoogleAnalytics.tsx) and scripts in [layout.tsx](mdc:src/app/layout.tsx).

## Deployment
Deployment is configured for Fly.io ([fly.toml](mdc:fly.toml)).

For more, see the [README.md](mdc:README.md).
