import Container from '@/components/Container';
import PostFeatured from '@/components/PostFeatured';
import { PostList } from '@/components/PostList';
import SpinLoader from '@/components/SpinLoader';
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
