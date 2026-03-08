// cache is not relevant for this query
import {api} from '@/libs/api';

export interface GetFilteredArticlesParams {
  category?: string;
  query?: string;
}

export async function getFilteredArticles(params: GetFilteredArticlesParams) {
  try {
    /*
      TODO: /trending returns only 3 items, featured=true returns only 1, so just limit response to 6 with default list
      Review before submit.
    */
    const res = await api.GET('/articles', {
      params: {
        query: {
          category: params.category,
          search: params.query,
          limit: 12,
        }
      }
    });

    return {
      error: null,
      data: res.data?.data || [],
    };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to get filtered news', data: null };
  }
}
