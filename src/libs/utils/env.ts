import z from 'zod';

const envSchema = z.object({
  appUrl: z.url(),
  apiUrl: z.url(),
  apiBypassToken: z.string(),
});

export const env = {
  appUrl: process.env.BASE_APP_URL,
  apiUrl: process.env.VERCEL_NEWS_API_URL,
  apiBypassToken: process.env.VERCEL_NEWS_API_BYPASS_TOKEN,
};

envSchema.parse(env);
