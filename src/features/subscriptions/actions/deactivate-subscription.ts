'use server';

import {api} from '@/libs/api';
import {cookies} from 'next/headers';
import {TOKEN_COOKIE_NAME} from '@/features/subscriptions/constants';

export async function deactivateSubscription() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    return {
      success: false,
      error: 'There is no active subscription',
    };
  }

  try {
    const res = await api.DELETE('/subscription', {
      params: {
        header: {
          'x-subscription-token': token
        }
      },
    });

    if (res.error) {
      console.error(res.error);
      return {
        success: false,
        error: 'S10: Cannot deactivate subscription'
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'S11: Cannot deactivate subscription'
    };
  }



  return { success: true, error: null };
}
