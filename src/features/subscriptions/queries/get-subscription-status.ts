import {cookies} from 'next/headers';
import {api} from '@/libs/api';
import {SUBSCRIPTION_STATUS} from '@/features/subscriptions/types';
import {TOKEN_COOKIE_NAME} from '@/features/subscriptions/constants';

export async function getSubscriptionStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    return {
      data: SUBSCRIPTION_STATUS.NOT_ACTIVE
    };
  }

  try {
    const res = await api.GET('/subscription', {
      params: {
        header: {
          'x-subscription-token': token
        }
      }
    });

    if (res.error) {
      console.error(res.error);
    }

    return {
      data: res.data?.data?.status === SUBSCRIPTION_STATUS.ACTIVE
        ? SUBSCRIPTION_STATUS.ACTIVE
        : SUBSCRIPTION_STATUS.NOT_ACTIVE
    };
  } catch(error) {
    console.error(error);
    return {
      data: SUBSCRIPTION_STATUS.NOT_ACTIVE
    };
  }
}
