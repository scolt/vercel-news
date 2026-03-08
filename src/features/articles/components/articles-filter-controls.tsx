import {getArticlesCategories} from '@/features/articles/queries/get-articles-categories';
import {ArticlesFilterControlsClient} from '@/features/articles/components/articles-filter-controls-client';

export function ArticlesFilterControlsFallback() {
  const categories = [{
    id: '1',
    className: 'w-13'
  }, {
    id: '2',
    className: 'w-35',
  }, {
    id: '3',
    className: 'w-20'
  }];


  return <div className="flex h-6 items-center justify-center w-full gap-3 flex-wrap animate-pulse">
    {categories.map((category) => <div key={category.id}>
      <div className={`h-5 rounded bg-gray-200 ${category.className}`} />
    </div>)}
  </div>
}

export async function ArticlesFilterControls () {
  const categories = await getArticlesCategories();

  if (!categories.data || categories.data.length === 0) {
    // we are safe to fully hide the control
    return null;
  }

  return <ArticlesFilterControlsClient categories={categories.data}/>
}
