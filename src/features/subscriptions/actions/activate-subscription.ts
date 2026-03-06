'use server';

import {api} from '@/libs/api';
import {cookies} from 'next/headers';
import {TOKEN_COOKIE_NAME} from '@/features/subscriptions/constants';

export async function activateSubscription() {
  const cookieStore = await cookies();
  let token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    try {
      const subscription = await api.POST('/subscription/create');

      if (subscription.error || !subscription.data?.data?.token) {
        console.error('Error: token is missing in response from /subscription/create');
        return {
          success: false,
          error: 'S02: Could not create subscription',
        }
      }

      token = subscription.data.data.token;
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: 'S03: Could not create subscription',
      }
    }
  }

  try {
    const res = await api.POST('/subscription', {
      params: {
        header: {
          'x-subscription-token': token
        }
      },
    });

    if (res.error) {
      return {
        success: false,
        error: 'S04: Failed to activate Subscription'
      };
    }
  } catch(error) {
    console.error(error);
    return {
      success: false,
      error: 'S05: Could not activate subscription',
    }
  }

  cookieStore.set(TOKEN_COOKIE_NAME, token);

  return { success: true, error: null };
}
