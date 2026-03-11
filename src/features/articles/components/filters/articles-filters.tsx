import {getArticlesCategories} from '@/features/articles/queries/get-articles-categories';
import {ArticlesFiltersClient} from '@/features/articles/components/filters/articles-filters-client';

export async function ArticlesFilters() {
  const categories = await getArticlesCategories();
  
  return <ArticlesFiltersClient categories={categories.data || []}/>;
}
