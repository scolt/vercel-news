import createClient from 'openapi-fetch';
import type { paths } from './schema';
import { env } from '@/libs/utils/env';

export const api = createClient<paths>({
    baseUrl: env.apiUrl,
    headers: {
        'x-vercel-protection-bypass': env.apiBypassToken,
    }
});
