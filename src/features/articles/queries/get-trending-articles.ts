import {api} from '@/libs/api';
import { cacheLife, cacheTag } from 'next/cache';

export async function getTrendingArticlesApi(excludeId?: string) {
  'use cache';
  cacheLife('featured-articles');
  cacheTag('trending-articles');
  const response = await api.GET('/articles/trending', {
    params: {
      query: {
        exclude: excludeId,
      }
    }
  });
  return response.data?.data;
}

export async function getTrendingArticles(excludeId?: string) {
  try {
    const data = await getTrendingArticlesApi(excludeId);
    const articles = data || [];
    return {
      data: articles.slice(0, 3),
      error: null,
    };
  } catch (error) {
    console.error('[Trending Articles]', error);
    return {
      error: 'Failed to get trending articles.',
      data: []
    };
  }
}
