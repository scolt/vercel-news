import Link from 'next/link';
import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Typography} from '@/components/ui/typography';
import {FeaturedArticlesList} from '@/features/articles/components/featured-articles/featured-articles-list';
import {ArticlesListFallback} from '@/features/articles/components/articles-list/articles-list-fallback';

export function FeaturedArticlesWidget () {
  return <section className="flex flex-col gap-4">
    <header className="flex justify-between">
      <div>
        <Typography variant="heading3" as="h3">
          Featured
        </Typography>
        <Typography variant="body2" className="text-gray-500">
          Handpicked stories from the team
        </Typography>
      </div>
      <Link href="/news">
        View all
      </Link>
    </header>
    <Suspense fallback={<ArticlesListFallback />}>
      <ErrorBoundary fallback={<div>Unable to load articles, please try again later.</div>}>
        <FeaturedArticlesList />
      </ErrorBoundary>
    </Suspense>
  </section>
}
