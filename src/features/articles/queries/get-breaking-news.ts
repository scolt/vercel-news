import {api} from '@/libs/api';
import {cacheLife, cacheTag} from 'next/cache';

export async function getBreakingNewsApi() {
  'use cache';
  cacheLife('breaking-news');
  cacheTag('breaking-news');

  const res = await api.GET('/breaking-news');
  return res.data?.data;
}

export async function getBreakingNews() {
  try {
    const data = await getBreakingNewsApi()
    return {
      data: data || null,
      error: null,
    }
  } catch (error) {
    console.error('[Breaking news]', error);

    return {
      data: null,
      error: 'Unable to get breaking news',
    };
  }
}
