import {cookies} from 'next/headers';
import {api} from '@/libs/api';
import {SUBSCRIPTION_STATUS} from '@/features/subscriptions/types';
import {TOKEN_COOKIE_NAME} from '@/features/subscriptions/constants';

async function getSubscriptionStatusApi(token: string) {
    const { error, data } = await api.GET('/subscription', {
      params: {
        header: {
          'x-subscription-token': token
        }
      }
    });

    if (error) {
      throw new Error(`${error.error?.code}: ${error.error?.message}`);
    }

    return data?.data?.status === SUBSCRIPTION_STATUS.ACTIVE
        ? SUBSCRIPTION_STATUS.ACTIVE
        : SUBSCRIPTION_STATUS.NOT_ACTIVE;
}

export async function getSubscriptionStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    return SUBSCRIPTION_STATUS.NOT_ACTIVE;
  }

  try {
    return getSubscriptionStatusApi(token);
  } catch(error) {
    console.error('[Subscription status]', error);
    return SUBSCRIPTION_STATUS.NOT_ACTIVE;
  }
}
