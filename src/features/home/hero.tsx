import {Suspense} from 'react';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';

import {Typography} from '@/components/ui/typography';
import {Button} from '@/components/ui/button';

import {SubscriptionButton} from '@/features/subscriptions/components/subscription-button/subscription-button';
import { SubscriptionButtonFallback } from '@/features/subscriptions/components/subscription-button/subscription-button-fallback';

export function Hero() {
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
          Browse news
          <ArrowRight/>
        </Button>
      </Link>
      <Suspense fallback={<SubscriptionButtonFallback/>}>
        <SubscriptionButton/>
      </Suspense>
    </footer>
  </section>
}
