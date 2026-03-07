'use server';

import {api} from '@/libs/api';
import {cookies} from 'next/headers';
import {TOKEN_COOKIE_NAME} from '@/features/subscriptions/constants';
import {SUBSCRIPTION_MODEL} from '@/features/subscriptions/types';
import {env} from '@/libs/utils/env';

async function crateOrActivateSubscriptionApi(token?: string): Promise<string> {
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

  let validToken = '';
  if (env.subscriptionsModel === SUBSCRIPTION_MODEL.API) {
    try {
      validToken = await crateOrActivateSubscriptionApi(token);
    } catch (error) {
      console.error('[Create/Activate subscription]', error);
      return {
        success: false,
        error: 'Unable to create or activate subscription',
      }
    }
  } else {
    validToken = 'local-token'; // it is not production case, but API does not work
  }

  cookieStore.set(TOKEN_COOKIE_NAME, validToken);

  return { success: true, error: null };
}
