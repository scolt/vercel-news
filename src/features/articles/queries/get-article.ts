import {api, components} from '@/libs/api';
import {cacheLife, cacheTag} from 'next/cache';

export async function getArticleApi (slug: string) {
  'use cache';
  cacheLife('article');
  cacheTag(`article-${slug}`);

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
}

export async function getArticle(slug: string): Promise<components['schemas']['Article'] | null> {
  try {
    return await getArticleApi(slug);
  } catch(error) {
    console.error('[Article]', error);
    throw new Error('Unable to get article');
  }
}
