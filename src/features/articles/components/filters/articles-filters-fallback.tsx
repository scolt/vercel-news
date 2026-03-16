export function ArticlesFiltersCategoryFallback() {
  const categories = [{
    id: '1',
    className: 'w-13'
  }, {
    id: '2',
    className: 'w-35',
  }, {
    id: '3',
    className: 'w-20'
  }, {
    id: '4',
    className: 'w-17'
  }];

  return <div className="flex items-center justify-center w-full gap-3 flex-wrap animate-pulse">
    {categories.map((category) => <div key={category.id}>
      <div className={`h-6 rounded bg-gray-200 ${category.className}`} />
    </div>)}
  </div>
}

export function ArticlesFiltersQueryFallback() {
  return <div className="flex animate-pulse items-center justify-center h-8.5">
    <div className="w-96 max-w-2/3 h-8 rounded bg-gray-200" />
  </div>
}

export function ArticlesFiltersFallback() {
  return <div className="flex flex-col items-center justify-center w-full gap-8" role="status" aria-label="Loading filters">
    <ArticlesFiltersCategoryFallback />
    <ArticlesFiltersQueryFallback />
  </div>;
}
