import {api} from '@/libs/api';
import {cacheLife, cacheTag} from 'next/cache';
import {getArticleApi} from '@/features/articles/queries/get-article';
import {getBreakingNewsDto} from '@/features/articles/dto/article';

export async function getBreakingNewsApi() {
  'use cache';
  cacheLife('breaking-news');
  cacheTag('breaking-news');

  const res = await api.GET('/breaking-news');
  return res.data?.data;
}

export async function getBreakingNews() {
  try {
    const data = await getBreakingNewsApi();

    if (!data) {
      return {
        data: null,
        error: null,
      }
    }

    // to keep url consistency
    let articleSlug: string | undefined = undefined;
    if (data.articleId) {
      const article = await getArticleApi(data.articleId);
      articleSlug = article?.slug;
    }

    return {
      data: getBreakingNewsDto(data, articleSlug),
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
