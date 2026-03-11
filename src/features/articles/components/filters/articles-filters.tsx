import {getArticlesCategories} from '@/features/articles/queries/get-articles-categories';
import {ArticlesFiltersClient} from '@/features/articles/components/filters/articles-filters-client';

export async function ArticlesFilters() {
  // we are safe to ignore error here
  const { data } = await getArticlesCategories();

  return <ArticlesFiltersClient categories={data}/>;
}
