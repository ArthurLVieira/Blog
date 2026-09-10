import { PostModel } from '@/models/post/post-model';
import clsx from 'clsx';
import React from 'react';
import Heading from '../Header';
import { formatDateTime, formatRelativeDate } from '@/helpers/format-datetime';
import PostDate from '../PostDate';

interface PostContetProps {
  postModel: Pick<PostModel, 'createdAt' | 'title' | 'excerpt'>;
  heading: React.ComponentProps<typeof Heading>;
}

const PostContet: React.FC<PostContetProps> = ({ postModel, heading }) => {
  const { createdAt, title, excerpt } = postModel;

  return (
    <div className={clsx('flex', 'flex-col', 'gap-4', 'sm:justify-center')}>
      <PostDate postModel={{ createdAt: createdAt }} />
      <Heading {...heading}>{title}</Heading>
      <p>{excerpt}</p>
    </div>
  );
};

export default PostContet;
