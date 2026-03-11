'use cache';

import {api} from '@/libs/api';
import {cacheLife, cacheTag} from 'next/cache';

export async function getBreakingNews() {
  cacheLife('breaking-news');
  cacheTag('breaking-news');

  try {
    const res = await api.GET('/breaking-news');
    return res.data?.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get breaking news')
  }
}
