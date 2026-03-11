'use cache';

import {api} from '@/libs/api';
import {cacheLife, cacheTag} from 'next/cache';

export async function getFeaturedArticlesApi () {
  'use cache';
  cacheLife('featured-articles');
  cacheTag('featured-articles');

  const res = await api.GET('/articles', {
    params: {
      query: {
        featured: 'true',
        limit: 6,
      }
    }
  });

  return res.data?.data || [];
}

export async function getFeaturedArticles() {
  try {
    const data = await getFeaturedArticlesApi();

    return {
      data: data || null,
      error: null,
    };
  } catch (error) {
    console.error('[Featured articles]', error);

    return {
      data: null,
      error: 'An error occurred while retrieving featured articles',
    }
  }
}
