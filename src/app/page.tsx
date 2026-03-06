import {BreakingNewsWidget} from '@/features/articles/breaking-news/components/breaking-news-widget';
import {Suspense} from 'react';
import {BreakingNewsWidgetFallback} from '@/features/articles/breaking-news/components/breaking-news-widget-fallback';
import {SubscriptionButtonFallback} from '@/features/subscriptions/components/subscription-button-fallback';
import {SubscriptionButton} from '@/features/subscriptions/components/subscription-button';

export default function Home() {
  return (
    <div>
      <Suspense fallback={<BreakingNewsWidgetFallback />}>
        <BreakingNewsWidget/>
      </Suspense>
      <main
        className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      </main>
    </div>
  );
}
