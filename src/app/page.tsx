import Container from '@/components/Container';
import Heading from '@/components/Header';
import MenuLink from '@/components/MenuLink';
import PostCoverImage from '@/components/PostCoverImage';
import PostFeatured from '@/components/PostFeatured';
import { PostList } from '@/components/PostList';
import SpinLoader from '@/components/SpinLoader';
import clsx from 'clsx';
import Image from 'next/image';
import { Suspense } from 'react';

export default async function HomePage() {
  return (
    <Container>
      <PostFeatured />
      <Suspense fallback={<SpinLoader />}>
        <PostList />
      </Suspense>
    </Container>
  );
}
