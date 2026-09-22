'use server';

import { PublicPost } from '@/dto/dto';
import { getZodErrorMessages } from '@/helpers/get-zod-error-messages';
import { PostCreateSchema } from '@/lib/post/validations';
import { string } from 'zod';

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

  return {
    formState: prev.formState,
    errors: [],
  };
}
