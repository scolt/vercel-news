import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingArticlesWidget, ArticlesWidgetFallback } from '@/features/articles';
import { Typography } from '@/components/ui/typography';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl m-auto pt-12 p-4 gap-6">
      <div className="flex flex-col gap-6">
        <Typography variant="heading2">Ohh, it is not found</Typography>
        <Typography variant="body1">We are sorry but the article you are looking for does not exist. It might have been removed or you might have followed an old link.</Typography>
        <div className="flex gap-4">
          <Link href="/">
            <Button>
              Go back to Home
            </Button>
          </Link>
          <Link href="/search">
            <Button>
              Go to Search
            </Button>
          </Link>
        </div>
      </div>

      <Suspense fallback={<ArticlesWidgetFallback />}>
        <TrendingArticlesWidget />
      </Suspense>
    </div>
  );
}
