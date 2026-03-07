import {getSubscriptionStatus} from '@/features/subscriptions/queries/get-subscription-status';
import {SUBSCRIPTION_STATUS} from '@/features/subscriptions/types';
import {Podcast} from 'lucide-react';

export async function SubscriptionBadge ()  {
  const subscriptionStatus = await getSubscriptionStatus();
  const hasActiveSubscription = subscriptionStatus.data === SUBSCRIPTION_STATUS.ACTIVE;
  return <div className="flex gap-1 text-xs font-bold rounded-md p-1 text-gray-500">
    {hasActiveSubscription && <Podcast size={18} /> }
    {hasActiveSubscription ? 'Subscribed' : 'Not subscribed'}
  </div>;
}
