'use cache';

import {api} from '@/libs/api';
import {cacheLife, cacheTag} from 'next/cache';

export async function getFeaturedArticles() {
  cacheLife('featured-articles');
  cacheTag('featured-articles');
  try {
    /*
      TODO: /trending returns only 3 items, featured=true returns only 1, so just limit response to 6 with default list
      Review before submit.
    */
    const res = await api.GET('/articles', {
      params: {
        query: {
          limit: 6,
        }
      }
    });

    return res.data?.data || [];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get featured news');
  }
}
