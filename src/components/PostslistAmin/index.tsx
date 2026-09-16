import { findAllPostAdmin } from '@/lib/post/queries/admin';
import Link from '../MenuLink';
import clsx from 'clsx';
import DeletePostButton from '../admin/DeletePostButton';

export default async function PostslistAmin() {
  const posts = await findAllPostAdmin();

  return (
    <div className='mb-16'>
      {posts.map(post => {
        return (
          <div
            key={post.id}
            className={clsx(
              'py-2 px-2',
              'bg-green-300 dark:bg-green-700',
              !post.published && 'bg-red-300 dark:bg-red-700',
              'justify-between',
              'gap-2',
              'flex',
              'rounded',
              'mb-2',
              'items-center',
            )}
          >
            <Link className='hover:scale-102' href={`/admin/post/${post.id}`}>
              {post.title}
            </Link>
            <DeletePostButton id={post.id} title={post.title} />
          </div>
        );
      })}
    </div>
  );
}
