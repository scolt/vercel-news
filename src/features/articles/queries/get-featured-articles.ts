'use cache';

import {api} from '@/libs/api';
import {cacheLife} from 'next/cache';

export async function getFeaturedArticles() {
  cacheLife('featured-articles');

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

    return {
      error: null,
      data: res.data?.data || [],
    };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to get featured news', data: null };
  }
}
