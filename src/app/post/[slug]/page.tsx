import React, { Suspense } from 'react';
import { findPostBySlugCached } from '@/lib/post/quries';
import { Metadata } from 'next';
import SinglePage from '@/components/SinglePage';
import SpinLoader from '@/components/SpinLoader';
import Container from '@/components/Container';

interface PostSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPostBySlugCached(slug);

  return {
    title: post.title,
    description: '',
  };
}

const PostSlugPage: React.FC<PostSlugPageProps> = async ({ params }) => {
  const { slug } = await params;

  return (
    <Container>
      <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
        <SinglePage slug={slug} />
      </Suspense>
    </Container>
  );
};

export default PostSlugPage;
