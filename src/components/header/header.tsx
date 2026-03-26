import Image from 'next/image';
import {Suspense} from 'react';
import {SubscriptionBadge, SubscriptionBadgeFallback} from '@/features/subscriptions';
import {HeaderNav} from './components/header-nav';
import Link from 'next/link';

export function Header() {
  return <header className="flex items-center justify-center my-4 ">
    <div className="flex flex-row w-full max-w-4xl items-center px-4 gap-8">
      <Link href="/" className="flex gap-1 items-center font-bold" prefetch={false}>
        <Image
          src="/vercel.svg"
          alt="Vercel Daily News"
          unoptimized
          width={24}
          height={24}
        />
        <div className="font-mono">
          <span className="hidden sm:inline">Vercel&nbsp;</span>
          <span>Daily</span>
        </div>
      </Link>
      <div className="flex gap-4 flex-1 items-center">
        <Suspense fallback={null}>
          <HeaderNav />
        </Suspense>
        <Suspense fallback={<SubscriptionBadgeFallback />}>
          <SubscriptionBadge />
        </Suspense>
      </div>
    </div>
  </header>
}
