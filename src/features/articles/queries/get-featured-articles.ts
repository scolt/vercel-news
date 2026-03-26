import {api} from '@/libs/api';
import {cacheLife, cacheTag} from 'next/cache';

export async function getFeaturedArticles() {
  'use cache';
  cacheTag('featured-articles');

  try {
    const res = await api.GET('/articles', {
      params: {
        query: {
          featured: 'true',
          limit: 6,
        }
      }
    });

    const data = res.data?.data;

    cacheLife('featured-articles');
    return {
      data: data || null,
      error: null,
    };
  } catch (error) {
    console.error('[Featured articles]', error);

    cacheLife({ expire: 0 });
    return {
      data: null,
      error: 'An error occurred while retrieving featured articles',
    }
  }
}
