import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';

import {BreakingNewsWidget} from '@/features/articles/components/breaking-news/breaking-news-widget';
import {FeaturedArticlesWidget} from '@/features/articles/components/featured-articles/featured-articles-widget';
import {BreakingNewsWidgetFallback} from '@/features/articles/components/breaking-news/breaking-news-widget-fallback';

import {Hero} from '@/features/home/hero';

export default function Home() {
  return (
    <div>
      <Suspense fallback={<BreakingNewsWidgetFallback/>}>
        {/* if breaking news is fail we can just do not display it, call for the page error boundary is not needed */}
        <BreakingNewsWidget />
      </Suspense>
      <main className="flex flex-col w-full max-w-4xl m-auto p-4 pt-10 gap-8">
        <Hero/>
        <FeaturedArticlesWidget />
      </main>
    </div>
  );
}
