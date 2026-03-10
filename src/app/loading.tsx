import {BreakingNewsWidgetFallback} from '@/features/articles/components/breaking-news-widget';
import {ArticlesListFallback} from '@/features/articles/components/articles-list';

export default function Loading() {
  return (
    <div aria-label="Loading" role="status">
      <BreakingNewsWidgetFallback />

      <main className="flex flex-col w-full max-w-4xl m-auto p-4 pt-10 gap-8">
        <section className="flex flex-col gap-6 animate-pulse">
          <header className="flex flex-col gap-2">
            <div className="h-4 w-40 rounded bg-gray-200" />
            <div className="h-10 w-full max-w-lg rounded bg-gray-200" />
            <div className="h-10 w-64 rounded bg-gray-200" />
          </header>
          <div className="flex flex-col gap-1.5 max-w-md">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>
          <div className="flex gap-2">
            <div className="h-11 w-40 rounded-md bg-gray-200" />
            <div className="h-11 w-36 rounded-md bg-gray-200" />
          </div>
        </section>

        <section className="flex flex-col gap-4 animate-pulse">
          <header className="flex justify-between items-start">
            <div className="flex flex-col gap-1.5">
              <div className="h-7 w-32 rounded bg-gray-200" />
              <div className="h-4 w-56 rounded bg-gray-200" />
            </div>
            <div className="h-4 w-16 rounded bg-gray-200" />
          </header>
          <ArticlesListFallback />
        </section>
      </main>
    </div>
  );
}
