import 'server-only';
import z from 'zod';

const envSchema = z.object({
  appUrl: z.url(),
  apiUrl: z.url(),
  apiBypassToken: z.string(),
  production: z.boolean(),
});

export const env = envSchema.parse({
  appUrl: process.env.BASE_APP_URL,
  apiUrl: process.env.VERCEL_NEWS_API_URL,
  apiBypassToken: process.env.VERCEL_NEWS_API_BYPASS_TOKEN,
  production: process.env.PRODUCTION === 'true',
});
