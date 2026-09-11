import { findPostBySlugCached } from '@/lib/post/quries';
import Image from 'next/image';
import Heading from '../Header';
import PostDate from '../PostDate';
import clsx from 'clsx';
import SafeMarkdown from '../SafeMarkdown';

interface SinglePageProps {
  slug: string;
}

const SinglePage: React.FC<SinglePageProps> = async ({ slug }) => {
  const post = await findPostBySlugCached(slug);
  return (
    <article className='mb-16'>
      <header className='group flex-col gap-4 mb-4'>
        <Image
          className='rounded-xl'
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
        />

        <Heading as='h2' href={`/post/${post.slug}`}>
          {post.title}
        </Heading>

        <p>
          {post.author} | <PostDate postModel={{ createdAt: post.createdAt }} />
        </p>
      </header>

      <p className={clsx('text-xl mb-4', 'text-slate-600 dark:text-slate-100')}>
        {post.excerpt}
      </p>

      <SafeMarkdown markdown={post.content} />
    </article>
  );
};

export default SinglePage;
