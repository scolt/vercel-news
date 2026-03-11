'use cache';

import {cacheLife} from 'next/cache';
import {api} from '@/libs/api';

export async function getArticlesCategories() {
  cacheLife('categories');

  try {
    const { data } = await api.GET('/categories');

    return data?.data || [];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get categories');
  }
}
