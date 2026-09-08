import Container from '@/components/Container';
import Heading from '@/components/Header';
import MenuLink from '@/components/MenuLink';
import PostCoverImage from '@/components/PostCoverImage';
import { PostList } from '@/components/PostList';
import SpinLoader from '@/components/SpinLoader';
import clsx from 'clsx';
import Image from 'next/image';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <Container>
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
            href: '#',
          }}
          imageProps={{
            width: 1200,
            height: 720,
            src: '/images/bryen_9.png',
            alt: 'Título do Post',
            priority: true,
          }}
        />

        <div className={clsx('flex', 'flex-col', 'gap-4', 'sm:justify-center')}>
          <time
            className={clsx(
              'text-slate-600 dark:text-slate-200',
              'mb-4',
              'text-sm/tight',
              'block',
            )}
            dateTime='2026-09-07'
          >
            07/04/2026
          </time>
          <Heading as='h2' href='#'>
            Lorem ipsum dolor sit amet.
          </Heading>

          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam,
            adipisci magnam quibusdam labore eum corporis unde modi corrupti
            omnis nisi ipsam natus enim deserunt voluptatibus perspiciatis atque
            id ex neque!
          </p>
        </div>
      </section>

      <Suspense fallback={<SpinLoader />}>
        <PostList />
      </Suspense>
    </Container>
  );
}
