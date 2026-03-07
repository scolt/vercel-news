import {BreakingNewsWidget, BreakingNewsWidgetFallback} from '@/features/articles/components/breaking-news-widget';
import {Suspense} from 'react';
import {SubscriptionButton, SubscriptionButtonFallback} from '@/features/subscriptions/components/subscription-button';
import {Typography} from '@/components/ui/typography';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
import {FeaturedArticlesWidget} from '@/features/articles/components/featured-articles-widget';

function HeroSection() {
  return <section className="flex flex-col gap-6">
    <header className="">
      <Typography as="h2" variant="caption">
        The Vercel Daily News
      </Typography>
      <Typography as="h1" variant="heading1" className="text-balance">News and insights for modern web
        developer</Typography>
    </header>
    <Typography variant="body2" className="text-balance max-w-md text-gray-500">
      Changelogs, engineering, deep dives, customer stories, and community updates &mdash; all in one place.
    </Typography>
    <footer className="flex gap-2">
      <Link href="/search">
        <Button variant="secondary" size="lg">
          Browse articles
          <ArrowRight/>
        </Button>
      </Link>

      <Suspense fallback={<SubscriptionButtonFallback/>}>
        <SubscriptionButton/>
      </Suspense>
    </footer>
  </section>
}

export default function Home() {
  return (
    <div>
      <Suspense fallback={<BreakingNewsWidgetFallback/>}>
        <BreakingNewsWidget/>
      </Suspense>
      <main className="flex flex-col w-full max-w-4xl m-auto p-4 pt-10 gap-8">
        <HeroSection/>
        <FeaturedArticlesWidget />
      </main>
    </div>
  );
}
