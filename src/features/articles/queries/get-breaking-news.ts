'use cache';

import {api} from '@/libs/api';
import {cacheLife} from 'next/cache';

export async function getBreakingNews() {
  cacheLife('breaking-news');

  try {
    const res = await api.GET('/breaking-news');
    return {
      error: null,
      data: res.data?.data,
    };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to get breaking news', data: null };
  }


}
