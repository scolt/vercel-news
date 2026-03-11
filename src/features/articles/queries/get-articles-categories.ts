import {cacheLife, cacheTag} from 'next/cache';
import {api} from '@/libs/api';

export async function getArticleCategoriesApi() {
  'use cache';
  cacheLife('categories');
  cacheTag('categories');

  const { data } = await api.GET('/categories');

  return data?.data || [];
}

export async function getArticlesCategories() {
  try {
    const data = await getArticleCategoriesApi();
    return {
      data: data || [],
      error: null,
    }
  } catch (error) {
    console.error('[Categories]', error);
    return {
      data: [],
      error: 'Unable to get list of categories',
    }
  }
}
