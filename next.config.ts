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
    'categories': {
      stale: 24 * 60 * 60,
      revalidate: 12 * 60 * 60,
      expire: 7 * 24 * 60 * 60,
    },
    'featured-articles': {
      stale: 60 * 60,
      revalidate: 30 * 60,
      expire: 4 * 60 * 60,
    },
    'breaking-news': {
      stale: 60,
      revalidate: 30,
      expire: 120,
    }
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
