import React, { Suspense } from 'react';
import { findPublicPostBySlugCached } from '@/lib/post/queries/public';
import { Metadata } from 'next';
import SinglePage from '@/components/SinglePage';
import SpinLoader from '@/components/SpinLoader';

export const instant = false;

interface PostSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPublicPostBySlugCached(slug);

  return {
    title: post.title,
    description: '',
  };
}

const PostSlugPage: React.FC<PostSlugPageProps> = async ({ params }) => {
  const { slug } = await params;

  return (
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
      <SinglePage slug={slug} />
    </Suspense>
  );
};

export default PostSlugPage;
