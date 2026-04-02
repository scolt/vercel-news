# Vercel Daily News

A modern news publication frontend built with **Next.js 16** and the **App Router**. The application serves as the reader-facing interface for Vercel Daily News.

## Tech Stack

- **Next.js 16** (App Router, `'use cache'`, `cacheLife`, `cacheTag`, React Compiler, `cacheComponents`)
- **React 19** with Server Components, Server Actions, and Suspense streaming
- **Tailwind CSS v4** with `@tailwindcss/postcss`
- **shadcn/ui** (Radix Nova style) with **Radix UI** primitives
- **openapi-fetch** + **openapi-typescript** for type-safe API consumption
- **Zod 4** for runtime validation
- **react-markdown** for rendering Markdown content blocks
- **class-variance-authority** for variant-driven component styling
- **dayjs** for date formatting
- **Lucide React** for icons
- **sonner** for toast notifications
- **@vercel/analytics** + **@vercel/speed-insights** for production monitoring
- **@vercel/og** for dynamic Open Graph image generation

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
| `BASE_APP_URL` | Public URL of the deployed application (used for metadata and OG images) |
| `VERCEL_NEWS_API_URL` | Base URL of the Vercel Daily News API instance |
| `VERCEL_NEWS_API_BYPASS_TOKEN` | Deployment protection bypass token (`x-vercel-protection-bypass` header) |
| `PRODUCTION` | Set to `true` for production environment |
| `SERVER_SECRET` | Secret key for authenticating incoming webhook requests |

Environment variables are validated at startup with Zod (see [`src/libs/utils/env.ts`](src/libs/utils/env.ts)). The app will throw immediately if any required variable is missing or malformed.

### Development

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

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
│   ├── api/webhooks/cache/       # Webhook endpoint for on-demand cache revalidation
│   ├── news/[slug]/              # Dynamic article pages with error/loading/not-found boundaries
│   ├── search/                   # Search page with filtered article listing
│   ├── opengraph-image.tsx       # Dynamic OG image generation for the root route
│   ├── layout.tsx                # Root layout with fonts, metadata, analytics
│   ├── page.tsx                  # Home page
│   ├── error.tsx                 # Root error boundary
│   ├── loading.tsx               # Root loading state
│   └── globals.css               # Tailwind v4 theme and global styles
├── components/                   # Shared, reusable UI components
│   ├── ui/                       # Design system primitives (shadcn/ui)
│   ├── header/                   # Application header with navigation
│   ├── footer/                   # Application footer (cached server component)
│   ├── blocks-view/              # Polymorphic content block renderer (paragraphs, images, lists, etc.)
│   └── display-date/             # Date formatting component
├── features/                     # Feature modules (domain-driven)
│   ├── home/                     # Home page feature (Hero section)
│   ├── articles/                 # Articles feature
│   │   ├── components/           # UI components (previews, lists, filters, widgets, details)
│   │   ├── queries/              # Server-side data fetching functions
│   │   └── dto/                  # Data transfer objects and mapping functions
│   └── subscriptions/            # Subscriptions feature
│       ├── actions/              # Server Actions (activate, deactivate)
│       ├── components/           # UI components (badge, button, promo)
│       ├── queries/              # Server-side data fetching functions
│       ├── constants.ts          # Shared constants (cookie names)
│       └── types.ts              # Enums and type definitions
├── libs/                         # Shared libraries and utilities
│   ├── api/                      # API client, OpenAPI spec, and generated types
│   └── utils/                    # Utility functions (cn, env, query-params)
└── constants.ts                  # App-wide constants (e.g. blur placeholder pixel)
```

### `src/app/` — Routes & Layout

The Next.js App Router directory. Contains the root layout, global CSS, page routes, route-level error/loading/not-found boundaries, a dynamic OG image generator, and a webhook API route for cache revalidation.

### `src/components/` — Shared Components

Reusable components that are **not tied to a specific feature domain**.

- **`ui/`** — Design system primitives built with [shadcn/ui](https://ui.shadcn.com/) (Radix Nova style). Foundational building blocks used across all features.
- **`header/`** — Application header with logo, navigation (client component for active-link detection), and subscription badge.
- **`footer/`** — Cached server component for the site footer.
- **`blocks-view/`** — Polymorphic content block renderer that maps API content blocks (paragraphs, headings, blockquotes, lists, images) to React components with Markdown support.
- **`display-date/`** — Reusable date formatting component using dayjs.

### `src/features/` — Feature Modules

Domain-driven feature slices. Each feature encapsulates its own **components**, **queries** (data fetching), **actions** (mutations), **DTOs**, **types**, and **constants**. Features are self-contained — they import from `libs/` and `components/` but never from each other.

#### `home/`

Contains the Hero section displayed on the home page.

#### `articles/`

Handles fetching and displaying news articles. Includes:
- **Components**: Article previews, detail views, content rendering, search filters (category & query), featured/trending/breaking-news widgets, and skeleton fallbacks for every async boundary.
- **Queries**: Cached server-side data fetching with granular `cacheLife` and `cacheTag` per data type.
- **DTOs**: Data transfer objects (`ArticleInfoDTO`, `ArticleContentDTO`) with mapping functions to shape API responses for specific UI needs.

#### `subscriptions/`

Manages the anonymous article subscription lifecycle via Server Actions: activate, check status, and deactivate. Uses cookies for session-based subscription tracking.

### `src/libs/` — Shared Libraries

Framework-level utilities and integrations shared across all features.

#### `api/` — API Client & Types

The type-safe API layer. See the [API Concept](#api-concept--type-safe-openapi-integration) section below for details.

- **`openapi.json`** — The OpenAPI 3.1.1 specification for the Vercel Daily News API.
- **`schema.ts`** — Auto-generated TypeScript types from the spec (via `openapi-typescript`). **Do not edit manually.**
- **`api.ts`** — Pre-configured `openapi-fetch` client with base URL and auth headers.
- **`index.ts`** — Barrel export for the client and schema types.

#### `utils/`

- **`env.ts`** — Zod-validated environment variables, parsed at module load time. Uses `server-only` to prevent client-side leakage.
- **`styles.ts`** — `cn()` utility combining `clsx` and `tailwind-merge` for conditional class composition.
- **`query-params.ts`** — Helper for immutably updating URL search parameters.

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

The [`openapi-fetch`](https://github.com/openapi-ts/openapi-typescript/tree/main/packages/openapi-fetch) library creates a fetch client that is parameterized by the generated `paths` type. Invalid paths, misspelled parameters, or incorrect types are caught at compile time — not at runtime.

#### Using Schema Types in Components

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

The app leverages Next.js 16's `'use cache'` directive with custom cache profiles defined in `next.config.ts`.

| Profile | Revalidate | Expire | Stale | Use Case |
|---|---|---|---|---|
| `article` | 7 days | 30 days | — | Individual article pages |
| `featured-articles` | 12 hours | 24 hours | — | Featured articles on the home page |
| `trending-articles` | 1 hour | 2 hours | — | Trending articles widget |
| `breaking-news` | 5 minutes | 1 hour | 3 minutes | Breaking news banner |
| `categories` | 2 days | 7 days | 12 hours | Article category filters |
| `filtered-articles` | — | 1 hour | — | Search results with category/query filters |

Additionally:

- **`cacheTag`** is used on every cached query to enable targeted on-demand revalidation via the webhook API (`/api/webhooks/cache`).
- **`cacheComponents: true`** is enabled in `next.config.ts` for component-level caching.
- **Error responses** are cached with `{ expire: 0 }` to prevent caching failures.
- **Free-text search queries** bypass the cache entirely to ensure fresh results.

---

## Webhook — On-Demand Cache Revalidation

The app exposes a `POST /api/webhooks/cache` endpoint that allows the backend API to trigger on-demand cache revalidation by tag.

**Request:**

```json
{
  "cacheKey": "featured-articles"
}
```

**Authentication:** The request must include a valid `x-news-api-webhook-secret` header matching the `SERVER_SECRET` environment variable.

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start development server on port 3001 |
| `pnpm build` | Create optimized production build |
| `pnpm start` | Start production server |
| `pnpm start:clean` | Build and start production server in one command |
| `pnpm lint` | Run ESLint |
| `pnpm gen:openapi` | Regenerate TypeScript types from the OpenAPI spec |
