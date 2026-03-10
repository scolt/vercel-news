import {ArticlesFilterControlsFallback} from '@/features/articles/components/articles-filter-controls';

export default function Loading() {
  return <div className="flex flex-col max-w-4xl items-center m-auto justify-center gap-6 animate-pulse">
    <div>
      <div className="w-xs h-9 rounded bg-gray-200" />
      <div className="w-sm h-8 rounded bg-gray-200 hidden sm:flex" />
    </div>
    <ArticlesFilterControlsFallback />
    <div>
      <div className="w-sm h-9 rounded bg-gray-200" />
    </div>
  </div>
}
