import { PostModel } from '@/models/post/post-model';
import { postRespository } from '@/repositories/post';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findPostByIdAdmin = (id: string) =>
  unstable_cache(
    cache(async (id: string): Promise<PostModel> => {
      const post = await postRespository.findById(id).catch(() => undefined);
      if (!post) notFound();
      return post;
    }),
    ['posts'],
    {
      tags: [`posts-${id}`],
    },
  );

export const findAllPostAdmin = unstable_cache(
  cache(async (): Promise<PostModel[]> => {
    const posts = await postRespository.findAll();
    if (!posts) notFound();
    return posts;
  }),
  ['posts'],
  {
    tags: [`posts`],
  },
);
