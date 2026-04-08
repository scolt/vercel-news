import {cookies} from 'next/headers';
import {api} from '@/libs/api';
import {SUBSCRIPTION_STATUS} from '@/features/subscriptions/types';
import {TOKEN_COOKIE_NAME} from '@/features/subscriptions/constants';

export async function getSubscriptionStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    return {
      data: SUBSCRIPTION_STATUS.NOT_ACTIVE,
      error: null,
    }
  }

  try {
    const { error, data } = await api.GET('/subscription', {
      params: {
        header: {
          'x-subscription-token': token
        }
      }
    });

    return {
      data: data?.data?.status === SUBSCRIPTION_STATUS.ACTIVE
        ? SUBSCRIPTION_STATUS.ACTIVE
        : SUBSCRIPTION_STATUS.NOT_ACTIVE,
      error: error || null,
    };
  } catch(error) {
    console.error('[Subscription status]', error);
    return {
      data: SUBSCRIPTION_STATUS.NOT_ACTIVE,
      error: 'Unable to get subscription status',
    }
  }
}
