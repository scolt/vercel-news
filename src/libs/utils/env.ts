import z from 'zod';

const envSchema = z.object({
  apiUrl: z.url(),
  apiBypassToken: z.string(),
  subscriptionsModel: z.enum(['api', 'local']),
});

export const env = {
  apiUrl: process.env.VERCEL_NEWS_API_URL,
  apiBypassToken: process.env.VERCEL_NEWS_API_BYPASS_TOKEN ,
  subscriptionsModel: process.env.SUBSCRIPTION_MODEL,
};

envSchema.parse(env);
