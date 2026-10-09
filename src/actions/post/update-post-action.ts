'use server';

import { PublicPost } from '@/dto/dto';
import { getZodErrorMessages } from '@/helpers/get-zod-error-messages';
import { makeSlugFromText } from '@/helpers/make-slug-from-text';
import {
  updatePostByIdAdmin,
  findPostByIdAdmin,
} from '@/lib/post/queries/admin';
import { PostUpdateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/post/post-model';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: true;
};

export default async function updatePostAction(
  prev: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  //TODO: verificar usuário logado

  const makeResult = ({
    formState = prev.formState,
    errors = [],
  }: UpdatePostActionState): UpdatePostActionState => ({
    formState,
    errors,
  });

  if (!(formData instanceof FormData)) {
    makeResult({ formState: prev.formState, errors: ['Dados inválidos'] });
  }

  const id = formData.get('id')?.toString() || '';

  if (!id || typeof id !== 'string') {
    makeResult({ formState: prev.formState, errors: ['ID inválido'] });
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParseObj = PostUpdateSchema.safeParse(formDataToObj);

  if (!zodParseObj.success) {
    const errors = getZodErrorMessages(zodParseObj.error.format());
    return makeResult({ formState: prev.formState, errors });
  }

  const validPostData = zodParseObj.data;
  const newPost = {
    ...validPostData,
  };

  let post;
  try {
    post = await updatePostByIdAdmin(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
      };
    }

    return {
      formState: newPost,
      errors: ['Erro desconhecido !'],
    };
  }

  revalidateTag('posts', { expire: 0 });
  const post = await findPostByIdAdmin(newPost.id);
}
