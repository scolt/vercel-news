'use cache';

import {api, components} from '@/libs/api';
import {cacheLife, cacheTag} from 'next/cache';

export async function getArticle(slug: string) {
  cacheLife('article');
  cacheTag(`article-${slug}`);

  try {
    const { data } = await api.GET('/articles/{id}', {
      params: {
        path: {
          id: slug,
        }
      }
    });

    if (!data || !data.data || !data.data.content)  {
      return null;
    }

    return data.data;
  } catch(error) {
    console.error(error);
    throw new Error('Unable to get article');
  }
}
