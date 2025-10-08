# Eventio - Claude Code Project Memory

## Project Overview

Eventio is a Next.js 15 application for managing events, built with TypeScript, using iron-session for authentication and next-safe-action for server actions.

## Development Commands

- **Dev**: `pnpm dev` - Start development server with Turbopack
- **Build**: `pnpm build` - Build production version
- **Lint**: `pnpm lint` - Run ESLint
- **Format**: `pnpm prettier` - Format code with Prettier
- **Test**: `pnpm test` - Run Jest tests
- **Storybook**: `pnpm storybook` - Start Storybook dev server

## Project Structure

### Core Directories

- `src/app/` - Next.js App Router pages and layouts
- `src/modules/` - Feature modules (dashboard, login)
- `src/server/` - Server-side logic (auth, client, actions)
- `src/lib/` - Shared utilities (safe-action, session)
- `src/hooks/` - React custom hooks
- `src/dictionaries/` - Internationalization

### Module Pattern

Each feature module in `src/modules/` should contain:

- `index.tsx` - Main component export
- Components specific to that feature
- Local types and utilities if needed

## Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Prefer type imports: `import type { Type } from './types'`
- Use Zod for runtime validation
- Define types in dedicated files when shared

### Next.js Patterns

- Use App Router (not Pages Router)
- Server Components by default, Client Components only when needed
- Use `@/` alias for imports from `src/`

### Authentication

- Use iron-session for session management (`src/lib/session.ts`)
- Server actions in `src/server/auth/actions.ts`
- Authentication middleware in `src/middleware.ts`
- Auth types defined in `src/server/auth/types.ts`

### Server Actions

- Use next-safe-action for type-safe server actions
- Define schemas with Zod in `src/server/auth/schema.ts`
- Create safe action client in `src/lib/safe-action.ts`
- Handle errors properly with custom error types

### Component Guidelines

- Use functional components with TypeScript
- Prefer composition over prop drilling
- Keep components focused and single-purpose
- Use proper TypeScript props interfaces

### File Naming

- Use kebab-case for files and directories
- Use PascalCase for React components
- Use camelCase for functions and variables

## Git Workflow

- Current branch: `feat/user-auth`
- Use conventional commits (commitlint configured)
- Husky pre-commit hooks enabled
- Lint-staged runs on commit

## Dependencies

- **Framework**: Next.js 15 with React 19
- **Authentication**: iron-session
- **Validation**: Zod
- **Actions**: next-safe-action
- **Environment**: @t3-oss/env-nextjs
- **Routing**: path-to-regexp

## Testing

- Jest configured for testing
- Storybook for component development
- Write tests for server actions and utilities

## Code Quality

- ESLint with Next.js rules
- Prettier for formatting
- Commitlint for commit messages
- Pre-commit hooks ensure quality

## Important Notes

- Always validate environment variables with @t3-oss/env-nextjs
- Use middleware for route protection
- Implement proper error handling in server actions
- Follow Next.js 15 best practices for performance
