import { PostModel } from '@/models/post/post-model';
import { postRespository } from '@/repositories/post';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findPostBySlugPublic = (slug: string) => {
  unstable_cache(
    cache(async (slug: string): Promise<PostModel> => {
      const post = await postRespository
        .findBySlugPublished(slug)
        .catch(() => undefined);
      if (!post) notFound();
      return post;
    }),
    ['posts'],
    {
      tags: [`posts-${slug}`],
    },
  );
};

export const findAllPostPublic = unstable_cache(
  cache(async (): Promise<PostModel[]> => {
    const post = await postRespository.findAll().catch(() => undefined);
    if (!post) notFound();
    return post;
  }),
  ['posts'],
  {
    tags: ['posts'],
  },
);
