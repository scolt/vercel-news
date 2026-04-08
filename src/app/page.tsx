import {Suspense} from 'react';

import {BreakingNewsWidget, ArticlesWidgetFallback, FeaturedArticlesWidget, BreakingNewsWidgetFallback} from '@/features/articles';
import {Hero} from '@/features/home/hero';

export default function Home() {
  return (
    <div>
      <Suspense fallback={<BreakingNewsWidgetFallback/>}>
        <BreakingNewsWidget />
      </Suspense>
      <main className="flex flex-col w-full max-w-4xl m-auto p-4 pt-10 gap-8">
        <Hero/>
        <Suspense fallback={<ArticlesWidgetFallback />}>
          <FeaturedArticlesWidget />
        </Suspense>
      </main>
    </div>
  );
}
