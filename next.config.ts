import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [50, 75],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.public.blob.vercel-storage.com'
    }]
  },
  cacheComponents: true,
  cacheLife: {
    'article': {
      revalidate: 7 * 24 * 60 * 60,
      expire: 30 * 24 * 60 * 60,
    },
    'filtered-articles': {
      expire: 60 * 60,
    },
    'categories': {
      stale: 12 * 60 * 60,
      revalidate: 2 * 24 * 60 * 60,
      expire: 7 * 24 * 60 * 60,
    },
    'featured-articles': {
      revalidate: 12 * 60 * 60,
      expire: 24 * 60 * 60,
    },
    'breaking-news': {
      stale: 3 * 60,
      revalidate: 5 * 60,
      expire: 1 * 60 * 60,
    }
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
