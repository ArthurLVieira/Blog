import { formatDateTime, formatRelativeDate } from '@/helpers/format-datetime';
import { PostModel } from '@/models/post/post-model';
import clsx from 'clsx';
import React from 'react';

interface PostDateProps {
  postModel: Pick<PostModel, 'createdAt'>;
}

const PostDate: React.FC<PostDateProps> = async ({ postModel }) => {
  const { createdAt } = postModel;
  const relative = await formatRelativeDate(createdAt);

  return (
    <time
      className={clsx(
        'text-slate-600 dark:text-slate-200',
        'mb-4',
        'text-sm/tight',
      )}
      dateTime={createdAt}
      title={relative}
    >
      {formatDateTime(createdAt)}
    </time>
  );
};

export default PostDate;
