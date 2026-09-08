import { PostModel } from '@/models/post/post-model';
import clsx from 'clsx';
import React from 'react';
import Heading from '../Header';
import { formatDateTime, formatRelativeDate } from '@/helpers/format-datetime';

interface PostContetProps {
  postModel: Pick<PostModel, 'createdAt' | 'title' | 'excerpt'>;
  heading: React.ComponentProps<typeof Heading>;
}

const PostContet: React.FC<PostContetProps> = ({ postModel, heading }) => {
  const { createdAt, title, excerpt } = postModel;

  return (
    <div className={clsx('flex', 'flex-col', 'gap-4', 'sm:justify-center')}>
      <time
        className={clsx(
          'text-slate-600 dark:text-slate-200',
          'mb-4',
          'text-sm/tight',
          'block',
        )}
        dateTime={createdAt}
        title={formatRelativeDate(createdAt)}
      >
        {formatDateTime(createdAt)}
      </time>
      <Heading {...heading}>{title}</Heading>

      <p>{excerpt}</p>
    </div>
  );
};

export default PostContet;
