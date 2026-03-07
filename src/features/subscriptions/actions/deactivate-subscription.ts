'use server';

import {api} from '@/libs/api';
import {cookies} from 'next/headers';
import {TOKEN_COOKIE_NAME} from '@/features/subscriptions/constants';
import {env} from '@/libs/utils/env';
import {SUBSCRIPTION_MODEL} from '@/features/subscriptions/types';

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
      success: false,
      error: 'There is no active subscription',
    };
  }

  if (env.subscriptionsModel === SUBSCRIPTION_MODEL.API) {
    try {
      await deactivateSubscriptionApi(token);
      return { success: true };
    } catch (error) {
      console.error('[Deactivate subscription]', error);
      return {
        success: false,
        error: 'Unable to cancel subscription',
      }
    }
  } else {
    // local is a default option
    cookieStore.delete(TOKEN_COOKIE_NAME);
    return { success: true };
  }
}
