// cache is not relevant for this query
import {api, components} from '@/libs/api';
import {cacheLife, cacheTag} from 'next/cache';
import {ARTICLES_PER_PAGE_RESULT} from '@/features/articles/constants';

export interface GetFilteredArticlesParams {
  category?: string;
  query?: string;
}

export async function getFilteredArticlesApi(params: GetFilteredArticlesParams) {
  const res = await api.GET('/articles', {
    params: {
      query: {
        category: params.category,
        search: params.query,
        limit: ARTICLES_PER_PAGE_RESULT,
      }
    }
  });

  return res.data?.data;
}

export async function getFilteredArticlesWithCache(params: GetFilteredArticlesParams) {
  'use cache';
  cacheLife('filtered-articles');
  cacheTag(`filtered-articles-${params.category || 'all'}`);

  return getFilteredArticlesApi(params);
}

export async function getFilteredArticles(params: GetFilteredArticlesParams) {
  try {
    let result: components['schemas']['Article'][] | undefined;
    
    const isAll = !params.category && !params.query;
    const isCategoryOnly = !!params.category && !params.query;
    
    // Only use cache when fetching all articles or filtering by category without search query,
    // otherwise fetch directly from API to ensure up-to-date results
    // Categories are limited, queries do not.
    if (isAll || isCategoryOnly) {
      result = await getFilteredArticlesWithCache(params);
    } else {
      result = await getFilteredArticlesApi(params);
    }

    return {
      data: result || [],
      error: null,
    };
  } catch (error) {
    console.error('[Search Articles]', error);
    return {
      error: 'Failed to get filtered news',
      data: []
    };
  }
}
