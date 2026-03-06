'use client';

import {useTransition} from 'react';
import {Loader2} from 'lucide-react';
import {activateSubscription} from '@/features/subscriptions/actions/activate-subscription';
import {deactivateSubscription} from '@/features/subscriptions/actions/deactivate-subscription';
import {Button} from '@/components/ui/button';
import {SUBSCRIPTION_STATUS} from '@/features/subscriptions/types';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';

export interface SubscriptionButtonClientProps {
  subscriptionStatus: SUBSCRIPTION_STATUS;
}

export function SubscriptionButtonClient ({ subscriptionStatus }: SubscriptionButtonClientProps)  {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const toggleSubscription = () => {
    startTransition(async () => {
      const operation = subscriptionStatus === 'active' ? deactivateSubscription : activateSubscription;
      const res = await operation();

      if (res.error) {
        toast.error(res.error, {
          position: 'top-center',
          duration: 3000,
        });
      }
      router.refresh();
    });
  };

  return <Button onClick={toggleSubscription} disabled={isPending}>
    {isPending && <Loader2 className="animate-spin" />}
    {subscriptionStatus === 'active' ? 'Unsubscribe' : 'Subscribe'}
  </Button>;
}
