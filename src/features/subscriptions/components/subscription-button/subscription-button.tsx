import {getSubscriptionStatus} from '@/features/subscriptions/queries/get-subscription-status';
import {SubscriptionButtonClient} from './subscription-button-client';

export async function SubscriptionButton ()  {
  const { data } = await getSubscriptionStatus();

  return <SubscriptionButtonClient subscriptionStatus={data} />
}
