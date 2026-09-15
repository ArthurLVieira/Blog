'use server';

import AsyncDelay from '@/helpers/async-delay';

export async function deletePostAction(id: string) {
  await AsyncDelay(2000);
}
