import { PostModel } from '@/models/post/post-model';
import { postRespository } from '@/repositories/post';
import { FaceSlightlyFrowning } from 'lucide-react';
import { cacheTag, unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findPostByIdAdmin = cache(
  async (id: string): Promise<PostModel> => {
    'use cache';
    cacheTag(`post/${id}`);
    const post = await postRespository.findById(id).catch(() => undefined);
    if (!post) notFound();
    return post;
  },
);

export const findPostBySlugAdmin = cache(
  async (slug: string): Promise<PostModel> => {
    'use cache';
    cacheTag('post', slug);
    const post = await postRespository.findBySlug(slug).catch(() => undefined);
    if (!post) notFound();
    return post;
  },
);

export const findAllPostAdmin = cache(async (): Promise<PostModel[]> => {
  'use cache';
  cacheTag(`posts`);
  const posts = await postRespository.findAll();
  if (!posts) notFound();
  return posts;
});
