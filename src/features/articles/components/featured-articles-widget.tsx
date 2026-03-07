import {Typography} from '@/components/ui/typography';
import Link from 'next/link';
import {Suspense} from 'react';
import {
  FeaturedArticlesList,
  FeaturedArticlesListFallback
} from '@/features/articles/components/featured-articles-list';

export async function FeaturedArticlesWidget () {

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
    <Suspense fallback={<FeaturedArticlesListFallback />}>
      <FeaturedArticlesList />
    </Suspense>
  </section>
}
