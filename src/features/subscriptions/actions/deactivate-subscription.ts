'use server';

import {api} from '@/libs/api';
import {cookies} from 'next/headers';
import {TOKEN_COOKIE_NAME} from '@/features/subscriptions/constants';

async function deactivateSubscriptionApi(token: string): Promise<void>  {
  const { error } = await api.DELETE('/subscription', {
    params: {
      header: {
        'x-subscription-token': token
      }
    },
  });

  if (error) {
    throw new Error(`${error.error?.code}: ${error.error?.message}`);
  }
}

export async function deactivateSubscription() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    return {
      data: null,
      error: 'There is no active subscription',
    };
  }

  try {
    await deactivateSubscriptionApi(token);
    cookieStore.delete(TOKEN_COOKIE_NAME);
    return {
      data: true,
      error: null
    };
  } catch (error) {
    console.error('[Deactivate subscription]', error);
    return {
      data: null,
      error: 'Unable to cancel subscription',
    }
  }
}
