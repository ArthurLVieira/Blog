import { PostModel } from '@/models/post/post-model';
import { postRespository } from '@/repositories/post';
import { cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findPublicPostBySlugCached = cache(
  async (slug: string): Promise<PostModel> => {
    'use cache';
    cacheTag(`post/${slug}`);
    const post = await postRespository
      .findBySlugPublished(slug)
      .catch(() => undefined);
    if (!post) notFound();
    return post;
  },
);

export const findAllPublicPostCached = cache(async (): Promise<PostModel[]> => {
  'use cache';
  cacheTag(`posts`);
  const posts = await postRespository
    .findByPublished(true)
    .catch(() => undefined);
  if (!posts) notFound();
  return posts;
});

export const findPublicLastCreated = async (): Promise<PostModel> => {
  'use cache';
  const post = await postRespository
    .findByLastCreatedAt()
    .catch(() => undefined);
  if (!post) notFound();
  return post;
};
