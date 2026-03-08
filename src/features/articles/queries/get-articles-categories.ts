'use cache';

import {cacheLife} from 'next/cache';
import {api} from '@/libs/api';

export async function getArticlesCategories() {
  cacheLife('categories');

  try {
    const { data } = await api.GET('/categories');

    return {
      error: null,
      data: data?.data || [],
    };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to get categories', data: null };
  }
}
