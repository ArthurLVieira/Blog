import { Suspense } from 'react';
import Post from '../Post';
import SpinLoader from '../SpinLoader';
import { findAllPublicPostCached } from '@/lib/post/queries/public';

export async function PostList() {
  const posts = await findAllPublicPostCached();

  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      <Suspense fallback={<SpinLoader />}>
        {posts.slice(1).map(post => {
          const postLink = `/post/${post.slug}`;
          return (
            <Post
              postLink={postLink}
              postModel={{
                coverImageUrl: post.coverImageUrl,
                createdAt: post.createdAt,
                excerpt: post.excerpt,
                title: post.title,
              }}
              postContentHeading={{ as: 'h2' }}
              key={post.id}
            />
          );
        })}
      </Suspense>
    </div>
  );
}
