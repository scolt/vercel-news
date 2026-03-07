import {getSubscriptionStatus} from '@/features/subscriptions/queries/get-subscription-status';
import {SubscriptionButtonClient} from './subscribe-button-client';

export function SubscriptionButtonFallback () {
  return <div className="animate-pulse">
    <div className="h-6 w-20 rounded bg-gray-200" />
  </div>;
}

export async function SubscriptionButton ()  {
  const subscriptionStatus = await getSubscriptionStatus();

  return <SubscriptionButtonClient subscriptionStatus={subscriptionStatus.data} />
}
