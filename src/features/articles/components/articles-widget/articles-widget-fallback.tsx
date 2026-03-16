import {ArticlesListFallback} from '@/features/articles/components/articles-list/articles-list-fallback';

export function ArticlesWidgetFallback() {
  return <div className="flex flex-col gap-4" role="status" aria-label="Loading articles">
    <div className="flex flex-col animate-pulse w-full gap-2">
      <div className="flex w-full gap-2 justify-between">
        <div className="h-7 w-30 rounded bg-gray-200" />
        <div className="h-5 w-20 rounded bg-gray-200" />
      </div>
      <div>
        <div className="h-5 w-56 rounded bg-gray-200" />
      </div>
    </div>
    <ArticlesListFallback />
  </div>
}
