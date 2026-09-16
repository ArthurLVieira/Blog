import { findAllPostAdmin } from '@/lib/post/queries/admin';
import Link from '../MenuLink';
import clsx from 'clsx';
import DeletePostButton from '../admin/DeletePostButton';
import Button from '../Button';

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

      <div
        className={clsx(
          'fixed z-50 inset-0 bg-black/50 backdrop-blur-xs',
          'flex items-center justify-center text-black',
        )}
      >
        <div
          className={clsx(
            'bg-slate-100 p-6 rounded-lg max-w-2xl mx-6',
            'flex flex-col gap-6',
            'shadow-lg shadow-black/30 text-center',
          )}
        >
          <h3 className='text-xl font-extrabold'>Título do diálogo</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti,
            ipsam quae laborum adipisci reprehenderit veniam delectus quos quas.
            Voluptates fuga, quisquam accusamus asperiores quam quo labore
            laborum modi similique quod?
          </p>
          <div className='flex items-center justify-around'>
            <button
              className={clsx(
                'bg-slate-200 hover:bg-slate-300 transition text-slate-950',
                'flex items-center justify-center',
                'py-2 px-4 rounded-lg cursor-pointer',
              )}
              autoFocus
            >
              Cancelar
            </button>

            <button
              className={clsx(
                'bg-blue-500 hover:bg-blue-600 transition text-blue-50',
                'flex items-center justify-center',
                'py-2 px-4 rounded-lg cursor-pointer',
              )}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
