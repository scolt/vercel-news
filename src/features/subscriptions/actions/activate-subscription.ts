'use server';

import {api} from '@/libs/api';
import {cookies} from 'next/headers';
import {TOKEN_COOKIE_NAME} from '@/features/subscriptions/constants';

export async function activateSubscriptionApi(token?: string): Promise<string> {
  let currentToken = token;

  if (!currentToken) {
      const { error, data } = await api.POST('/subscription/create');

      if (error || !data?.data?.token) {
        throw new Error(error || 'Token is missing in response');
      }

      currentToken = data.data.token;
  }

  const { error } = await api.POST('/subscription', {
    params: {
      header: {
        'x-subscription-token': currentToken
      }
    },
  });

  if (error) {
    throw new Error(`${error.error?.code}: ${error.error?.message}`);
  }


  return currentToken as string;
}

export async function activateSubscription() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

  try {
    const validToken = await activateSubscriptionApi(token);
    cookieStore.set(TOKEN_COOKIE_NAME, validToken);

    return {
      data: true,
      error: null
    };
  } catch (error) {
    console.error('[Create/Activate subscription]', error);
    cookieStore.delete(TOKEN_COOKIE_NAME);

    return {
      data: null,
      error: 'Unable to create or activate subscription',
    }
  }
}
