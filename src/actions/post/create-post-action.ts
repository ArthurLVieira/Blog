'use server';

import { PublicPost } from '@/dto/dto';
import { getZodErrorMessages } from '@/helpers/get-zod-error-messages';
import { makeSlugFromText } from '@/helpers/make-slug-from-text';
import { createPostAdmin, findPostByIdAdmin } from '@/lib/post/queries/admin';
import { PostCreateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/post/post-model';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
};

export default async function createPostAction(
  prev: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  //TODO: verificar usuário logado

  const makeResult = ({
    formState = prev.formState,
    errors = [],
  }: CreatePostActionState): CreatePostActionState => ({
    formState,
    errors,
  });

  if (!(formData instanceof FormData)) {
    makeResult({ formState: prev.formState, errors: ['Dados inválidos'] });
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParseObj = PostCreateSchema.safeParse(formDataToObj);

  if (!zodParseObj.success) {
    const errors = getZodErrorMessages(zodParseObj.error.format());
    return makeResult({ formState: prev.formState, errors });
  }

  const validPostData = zodParseObj.data;
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuidV4(),
    slug: makeSlugFromText(validPostData.title),
  };

  try {
    await createPostAdmin(newPost);
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
  redirect(`/admin/post/${newPost.id}`);
}
