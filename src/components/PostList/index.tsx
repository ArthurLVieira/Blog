import { postRespository } from '@/repositories/post';
import PostCoverImage from '../PostCoverImage';
import PostContet from '../PostContent';

export async function PostList() {
  const posts = await postRespository.findAll();

  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map(post => {
        const postLink = `/post/${post.slug}`;
        return (
          <div className='flex flex-col gap-4 group' key={post.id}>
            <PostCoverImage
              linkProps={{
                href: postLink,
              }}
              imageProps={{
                width: 1200,
                height: 720,
                src: post.coverImageUrl,
                alt: post.title,
              }}
            />

            <PostContet
              heading={{ as: 'h2', href: postLink }}
              postModel={{
                createdAt: post.createdAt,
                title: post.title,
                excerpt: post.excerpt,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
