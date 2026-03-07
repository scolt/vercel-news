import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [50, 75],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**public.blob.vercel-storage.com'
    }]
  },
  cacheComponents: true,
  cacheLife: {
    'featured-articles': {
      stale: 60 * 60,
      revalidate: 30 * 60,
      expire: 4 * 60 * 60,
    },
    'breaking-news': {
      stale: 150, // stale for 2.5 mins
      revalidate: 60, // 1 min
      expire: 300, // 5 mins is maximum for breaking news
    }
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
