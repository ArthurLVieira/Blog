'use server';

import AsyncDelay from '@/helpers/async-delay';
import { postRespository } from '@/repositories/post';
import { error } from 'console';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  // TODO: checar login de usuário

  //TODO: remover linha abaixo

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dado inválido !',
      message: `Tipo ${typeof id} inválido para id.`,
    };
  }

  const post = await postRespository.findById(id).catch(() => undefined);

  if (!post) {
    return {
      error: 'Post não existe.',
      message: `Post não encontrado para id: ${id}`,
    };
  }

  //TODO: reavalidateTag ou revalidatePath
  revalidateTag(`post-${post.slug}`);

  await postRespository.deleteById(id);

  return {
    error: '',
    message: '',
  };
}
