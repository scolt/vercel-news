import Image from 'next/image';
import Link from 'next/link';
import {Typography} from '@/components/ui/typography';
import {Suspense} from 'react';
import {SubscriptionButtonFallback} from '@/features/subscriptions/components/subscription-button-fallback';
import {SubscriptionButton} from '@/features/subscriptions/components/subscription-button';

export function Header() {
  return <header className="flex items-center justify-center my-4 ">
    <div className="flex flex-col md:flex-row w-full max-w-3xl items-center px-4 gap-8">
      <div className="flex gap-4 items-center font-bold">
        <Image
          src="/vercel.svg"
          alt="Vercel Daily News"
          height={32}
          width={32}
        />
        <div className="font-mono">
          Vercel Daily
        </div>
      </div>
      <div className="flex gap-4 flex-1">
        <nav className="flex items-center gap-4 flex-1" aria-label="Main navigation">
          <Link href="/">
            <Typography as="span" variant="body2">
              Home
            </Typography>
          </Link>
          <Link href="/search">
            <Typography as="span" variant="body2" className="text-gray-700 hover:text-gray-900">
              Search
            </Typography>
          </Link>
        </nav>
        <Suspense fallback={<SubscriptionButtonFallback />}>
          <SubscriptionButton />
        </Suspense>
      </div>
    </div>
  </header>
}
