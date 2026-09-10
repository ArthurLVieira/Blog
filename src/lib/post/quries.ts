import { PostModel } from '@/models/post/post-model';
import { postRespository } from '@/repositories/post';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findPostById = cache(async (id: string): Promise<PostModel> => {
  const post = await postRespository.findById(id).catch(() => undefined);
  if (!post) notFound();
  return post;
});

export const findPostBySlugCached = cache(
  async (slug: string): Promise<PostModel> => {
    const post = await postRespository.findBySlug(slug).catch(() => undefined);
    if (!post) notFound();
    return post;
  },
);

export const findAll = cache(async (): Promise<PostModel[]> => {
  const post = await postRespository.findAll().catch(() => undefined);
  if (!post) notFound();
  return post;
});
