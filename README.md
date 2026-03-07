# Vercel Daily News

A modern news publication frontend built with **Next.js 16** and the **App Router**. The application serves as the reader-facing interface for Vercel Daily News.

## Tech Stack

- **Next.js 16** (App Router, `'use cache'`, `cacheLife`, React Compiler, `cacheComponents`)
- **React 19** with Server Components, Server Actions, and Suspense streaming
- **Tailwind CSS v4** with `@tailwindcss/postcss`
- **shadcn/ui** (Radix Nova style)
- **openapi-fetch** + **openapi-typescript** for type-safe API consumption
- **Zod 4** for validation
- **dayjs** for date formatting
- **Lucide React** for icons

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended package manager)

### Installation

```bash
pnpm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `VERCEL_NEWS_API_URL` | Base URL of the Vercel Daily News API instance |
| `VERCEL_NEWS_API_BYPASS_TOKEN` | Deployment protection bypass token (`x-vercel-protection-bypass` header) |
| `SUBSCRIPTION_MODEL` | `api` to use the remote subscription API, or `local` for cookie-only local mode |

Environment variables are validated at startup with Zod (see [`src/libs/utils/env.ts`](src/libs/utils/env.ts)). The app will throw immediately if any required variable is missing or malformed.

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
pnpm build
pnpm start
```

### Linting

```bash
pnpm lint
```

### Regenerate API Types

After updating the OpenAPI spec (`src/libs/api/openapi.json`), regenerate the TypeScript schema:

```bash
pnpm gen:openapi
```

---

## Project Structure

```
src/
├── app/                          # Next.js App Router (routes, layouts, global styles)
├── components/                   # Shared, reusable UI components
│   ├── ui/                       # Design system primitives (shadcn/ui)
│   └── header/                   # Application header (layout component)
├── features/                     # Feature modules (domain-driven)
│   ├── articles/                 # Articles feature
│   │   ├── components/           # UI components for articles
│   │   └── queries/              # Server-side data fetching functions
│   └── subscriptions/            # Subscriptions feature
│       ├── actions/              # Server Actions (mutations)
│       ├── components/           # UI components for subscriptions
│       ├── queries/              # Server-side data fetching functions
│       ├── constants.ts          # Shared constants (cookie names)
│       └── types.ts              # Enums and type definitions
└── libs/                         # Shared libraries and utilities
    ├── api/                      # API client, OpenAPI spec, and generated types
    └── utils/                    # Utility functions (cn, env validation)
```

### `src/app/` — Routes & Layout

The Next.js App Router directory. Contains the root layout, global CSS, page routes, and route-level error/loading boundaries.

### `src/components/` — Shared Components

Reusable components that are **not tied to a specific feature domain**.

#### `ui/` — Design System Primitives

Built with [shadcn/ui](https://ui.shadcn.com/) (Radix Nova style). These are the foundational building blocks used across all features:

### `src/features/` — Feature Modules

Domain-driven feature slices. Each feature encapsulates its own **components**, **queries** (data fetching), **actions** (mutations), **types**, and **constants**. Features are self-contained — they import from `libs/` and `components/` but never from each other.

#### `articles/`

Handles fetching and displaying news articles.

#### `subscriptions/`

Manages the anonymous article subscription lifecycle: create, activate, check status, and deactivate.

### `src/libs/` — Shared Libraries

Framework-level utilities and integrations shared across all features.

#### `api/` — API Client & Types

The type-safe API layer. See the [API Concept](#api-concept--type-safe-openapi-integration) section below for details.

- **`openapi.json`** — The OpenAPI 3.1.1 specification for the Vercel Daily News API.
- **`schema.ts`** — Auto-generated TypeScript types from the spec (via `openapi-typescript`). **Do not edit manually.**
- **`api.ts`** — Pre-configured `openapi-fetch` client with base URL and auth headers.
- **`index.ts`** — Barrel export for the client and schema types.

#### `utils/`

- **`env.ts`** — Zod-validated environment variables, parsed at module load time.
- **`styles.ts`** — `cn()` utility combining `clsx` and `tailwind-merge` for conditional class composition.
- **`index.ts`** — Barrel export.

---

## API Concept — Type-Safe OpenAPI Integration

This project uses a **contract-first API approach** where the OpenAPI specification is the single source of truth for all API interactions. This ensures end-to-end type safety between the backend API and the frontend code with zero manual type definitions.

```bash
pnpm gen:openapi
```

This produces `src/libs/api/schema.ts` containing:

- **`paths`** — Every API route with typed request params and response bodies
- **`components`** — All reusable schemas (`Article`, `BreakingNews`, `Subscription`, `Category`, `ContentBlock`, etc.)
- **`operations`** — Individual operation types with full parameter and response typing

This file is auto-generated and should never be edited by hand. Regenerate it whenever the API spec changes.

#### Runtime Client (`openapi-fetch`)

The [`openapi-fetch`](https://github.com/openapi-ts/openapi-typescript/tree/main/packages/openapi-fetch) library creates a fetch client that is parameterized by the generated `paths` type:

Invalid paths, misspelled parameters, or incorrect types are caught at compile time — not at runtime.

### Using Schema Types in Components

You can import component schemas directly from `@/libs/api` for use in props:

```ts
import { components } from '@/libs/api';

interface ArticlePreviewProps {
  article: components['schemas']['Article'];
}
```

This keeps component interfaces synchronized with the API contract automatically.

---

## Caching Strategy

The app leverages Next.js 16's `'use cache'` directive with custom cache profiles defined in `next.config.ts`:
The `cacheComponents: true` experimental flag is enabled for component-level caching.

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Create optimized production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint with auto-fix |
| `pnpm gen:openapi` | Regenerate TypeScript types from the OpenAPI spec |
