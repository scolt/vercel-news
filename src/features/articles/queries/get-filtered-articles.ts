// cache is not relevant for this query
import {api} from '@/libs/api';

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
        limit: 12,
      }
    }
  });

  return res.data?.data;
}

export async function getFilteredArticles(params: GetFilteredArticlesParams) {
  try {
    const data = await getFilteredArticlesApi(params);

    return {
      data: data || [],
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
