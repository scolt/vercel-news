import z from 'zod';

const envSchema = z.object({
  apiUrl: z.url(),
  apiBypassToken: z.string(),
});

export const env = {
  apiUrl: process.env.VERCEL_NEWS_API_URL,
  apiBypassToken: process.env.VERCEL_NEWS_API_BYPASS_TOKEN,
};

envSchema.parse(env);
