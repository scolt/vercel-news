# Vercel Daily News

A modern news publication frontend built with **Next.js 16** and the **App Router**. The application serves as the reader-facing interface for Vercel Daily News.

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

## API Concept — Type-Safe OpenAPI Integration

This project uses a **contract-first API approach** where the OpenAPI specification is the single source of truth for all API interactions. This ensures end-to-end type safety between the backend API and the frontend code with zero manual type definitions.

```bash
pnpm gen:openapi
```

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

## Patterns

### Error handling in cached queries

Queries used by components should handle errors outside the cached function.
This prevents caching error responses and lets the caller decide how to handle failures.

```ts
// Cached function — only responsible for fetching and caching.
export async function getContentApi(slug: string) {
  'use cache';
  cacheLife('my-content');
  cacheTag(`my-content-${slug}`);

  const { data } = await api.GET('/my-endpoint');

  if (!data?.data) return null;
  return data.data;
}

// Public API — handles errors and decides what to surface.
// Option A: throw a safe, processed error
export async function getContent(slug: string): Promise<Content> {
  try {
    return await getContentApi(slug);
  } catch (error) {
    console.error('[Content]', error);
    throw new Error('Unable to get content');
  }
}

// Option B: return a fallback instead of throwing
export async function getContent(slug: string): Promise<ContentResult> {
  try {
    const data = await getContentApi(slug);
    return { data, error: null };
  } catch (error) {
    console.error('[Content]', error);
    return { data: null, error: 'Unable to get content' };
  }
}
```
