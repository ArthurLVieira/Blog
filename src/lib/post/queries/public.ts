import { PostModel } from '@/models/post/post-model';
import { postRespository } from '@/repositories/post';
import { cacheLife, cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findPublicPostBySlugCached = cache(
  async (slug: string): Promise<PostModel> => {
    'use cache';
    cacheTag('post', slug);
    cacheLife('seconds');
    const post = await postRespository
      .findBySlugPublished(slug)
      .catch(() => undefined);
    if (!post) notFound();
    return post;
  },
);

export const findAllPublicPostCached = cache(async (): Promise<PostModel[]> => {
  'use cache';
  cacheTag('posts');
  const post = await postRespository.findAll().catch(() => undefined);
  if (!post) notFound();
  return post;
});
