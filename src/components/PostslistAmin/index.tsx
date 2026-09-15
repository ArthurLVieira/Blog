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
          'fixed',
          'z-50',
          'inset-0',
          'bg-black/10',
          'backdrop-blur-xs',
          'flex',
          'items-center',
          'justify-center',
        )}
      >
        <div
          className={clsx(
            'bg-slate-100',
            'p-6',
            'rounded-lg',
            'max-w-2xl',
            'mx-6',
            'flex',
            'flex-col',
            'gap-2',
          )}
        >
          <h3>Título do dialog</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            facere, sequi nulla quas ex voluptates libero molestiae magnam
            suscipit, fuga quos veritatis officia aut beatae eligendi
            cupiditate? Libero, alias corrupti.
          </p>
          <div className='flex items-center justify-around mt-3'>
            <Button className='bg-red-400 top'>cancelar</Button>
            <Button className='bg-green-400 rounded-2xl w-20'>ok</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
