# Eventio

## Introduction

Eventio is a Next.js application for managing events. This project serves as a test for hiring new developers.

## Prerequisites

- Node.js (version 18 or higher)
- pnpm package manager

## Installation

```bash
pnpm install
```

## Usage

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
pnpm build
pnpm start
```

### Linting

```bash
pnpm lint
```

### Testing

```bash
pnpm test
```

### Code Formatting

```bash
pnpm prettier
```

### Storybook

Run Storybook for component development:

```bash
pnpm storybook
```

Build Storybook:

```bash
pnpm build-storybook
```

## Technology Stack

## Development Workflow

This project uses Husky for Git hooks to ensure code quality:

- Pre-commit hooks run linting and formatting
- Commit messages follow conventional commit format
- Lint-staged ensures only staged files are processed
