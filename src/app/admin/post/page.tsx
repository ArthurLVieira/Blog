import PostslistAmin from '@/components/PostslistAmin';
import SpinLoader from '@/components/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default async function AdminPostPage() {
  return (
    <Suspense fallback={<SpinLoader />}>
      <PostslistAmin />
    </Suspense>
  );
}
