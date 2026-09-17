import clsx from 'clsx';
import PostCoverImage from '../PostCoverImage';
import PostContet from '../PostContent';
import { findPublicLastCreated } from '@/lib/post/queries/public';

const PostFeatured: React.FC = async () => {
  const post = await findPublicLastCreated();
  const { coverImageUrl, createdAt, excerpt, title } = post;
  const postLink = `/post/${post.slug}`;
  return (
    <section
      className={clsx(
        'grid',
        'grid-cols-1',
        'gap-8',
        'mb-16',
        'sm:grid-cols-2',
        'group',
      )}
    >
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          width: 1200,
          height: 720,
          src: coverImageUrl,
          alt: title,
          priority: true,
        }}
      />

      <PostContet
        heading={{ as: 'h2', href: postLink }}
        postModel={{
          createdAt: createdAt,
          title: title,
          excerpt: excerpt,
        }}
      />
    </section>
  );
};

export default PostFeatured;
