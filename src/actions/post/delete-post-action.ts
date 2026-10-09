'use server';

import { deletePostByIdAdmin } from '@/lib/post/queries/admin';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  // TODO: checar login de usuário

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dado inválido !',
      message: `Tipo ${typeof id} inválido para id.`,
    };
  }

  let post;
  try {
    post = await deletePostByIdAdmin(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        error: 'Erro',
        message: [e.message],
      };
    }

    return {
      error: 'Erro',
      message: 'Erro desconhecido !',
    };
  }

  revalidateTag(`post-${id}`, { expire: 0 });
  revalidateTag(`post-${post.slug}`, { expire: 0 });
  revalidateTag('posts', { expire: 0 });

  return {
    error: '',
    message: '',
  };
}
