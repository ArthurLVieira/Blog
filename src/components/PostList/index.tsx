import { postRespository } from '@/repositories/post';
import Post from '../Post';

export async function PostList() {
  const posts = await postRespository.findAll();

  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map(post => {
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
    </div>
  );
}
