import {Suspense} from 'react';
import {Typography} from '@/components/ui/typography';
import {SubscriptionButton} from '@/features/subscriptions';

export function SubscriptionPromo () {
  return <div className="relative">
    <div className="bg-linear-to-b from-transparent to-white absolute -top-40 w-full h-40"></div>
    <div className="-mt-20 relative bg-white mb-10 flex flex-col gap-4 rounded-md border-2 w-100 p-4 max-w-11/12 m-auto">
      <Typography variant="strong2">
        Full content is available only to subscribed users.
      </Typography>
      <Typography variant="body2">
        It&#39;s completely free — just tap the button below to get started.
      </Typography>
      <Suspense fallback={<SubscriptionButton />}>
        <SubscriptionButton />
      </Suspense>
    </div>
  </div>;
}
