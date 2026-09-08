import { PostModel } from '@/models/post/post-model';
import PostContet from '../PostContent';
import PostCoverImage from '../PostCoverImage';
import { Key } from 'react';

interface PostProps {
  postLink: string;
  postModel: Pick<
    PostModel,
    'id' | 'coverImageUrl' | 'title' | 'createdAt' | 'excerpt'
  >;
  key?: Key | null | undefined;
}

const Post: React.FC<PostProps> = ({ postLink, postModel, key }) => {
  const { id, coverImageUrl, title, createdAt, excerpt } = postModel;
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
        heading={{ as: 'h2', href: postLink }}
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
