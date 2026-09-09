import { PostModel } from '@/models/post/post-model';
import PostContet from '../PostContent';
import PostCoverImage from '../PostCoverImage';
import { Key } from 'react';
import Heading from '../Header';

interface PostProps {
  postLink: string;
  postModel: Pick<
    PostModel,
    'coverImageUrl' | 'title' | 'createdAt' | 'excerpt'
  >;
  postContentHeading: React.ComponentProps<typeof Heading>;

  key?: Key | null | undefined;
}

const Post: React.FC<PostProps> = ({
  postLink,
  postModel,
  postContentHeading,
  key,
}) => {
  const { coverImageUrl, title, createdAt, excerpt } = postModel;
  return (
    <div className='flex flex-col gap-4 group' key={key}>
      <PostCoverImage
        linkProps={{
          href: postLink,
        }}
        imageProps={{
          width: 1200,
          height: 720,
          src: coverImageUrl,
          alt: title,
        }}
      />

      <PostContet
        heading={{ as: postContentHeading.as, href: postLink }}
        postModel={{
          createdAt: createdAt,
          title: title,
          excerpt: excerpt,
        }}
      />
    </div>
  );
};

export default Post;
