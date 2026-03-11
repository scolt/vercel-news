import {getSubscriptionStatus} from '@/features/subscriptions/queries/get-subscription-status';
import {SubscriptionButtonClient} from './subscription-button-client';

export async function SubscriptionButton ()  {
  const subscriptionStatus = await getSubscriptionStatus();

  return <SubscriptionButtonClient subscriptionStatus={subscriptionStatus.data} />
}
