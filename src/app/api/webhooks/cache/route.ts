import { env } from "@/libs/utils/env";
import { revalidateTag } from "next/cache";

export interface WebhookRequestBody {
    cacheKey: string;
    profile?: string | { expire: number };
}

// for the test project we can support only tag revalidation
export async function POST(request: Request) {
    const isAuthorizedToPurgeCache = request.headers.get("x-news-api-webhook-secret") === env.serverSecret;
    if (!isAuthorizedToPurgeCache) {
        return new Response("Unauthorized", { status: 401 });
    }

    let body: WebhookRequestBody;
    try {
        body = await request.json();
    } catch {
        return new Response("Bad Request: Invalid JSON", { status: 400 });
    }

    if (!body.cacheKey) {
        return new Response("Bad Request: Missing cache key", { status: 400 });
    }

    revalidateTag(body.cacheKey, body.profile || 'max');

    return new Response(`Revalidation for cache with key ${body.cacheKey} has been triggered`, { status: 200 });
    
}