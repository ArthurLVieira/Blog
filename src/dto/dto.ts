import { PostModel } from '@/models/post/post-model';

export type PublicPost = Omit<PostModel, 'updatedAt' | 'createdAt'>;

export const makePartialPublicPost = (
  post?: Partial<PostModel>,
): PublicPost => {
  return {
    id: post?.id || '',
    slug: post?.slug || '',
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    author: post?.author || '',
    content: post?.content || '',
    coverImageUrl: post?.coverImageUrl || '',
    published: post?.published || false,
  };
};

export const makePublicPostFromDb = (post: PostModel): PublicPost => {
  return makePartialPublicPost(post);
};
