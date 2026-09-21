import { findAllPostAdmin } from '@/lib/post/queries/admin';
import Link from '../../Link';
import clsx from 'clsx';
import DeletePostButton from '../DeletePostButton';

export default async function PostslistAmin() {
  const posts = await findAllPostAdmin();

  return (
    <div className={clsx('p-10 rounded-xl bg-white', 'dark:bg-slate-800')}>
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
