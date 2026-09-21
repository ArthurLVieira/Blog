import PageTitle from '@/components/admin/PageTitle';
import PostslistAmin from '@/components/admin/PostslistAmin';
import SpinLoader from '@/components/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default async function AdminPostPage() {
  return (
    <>
      <PageTitle title='Post' />
      <Suspense fallback={<SpinLoader />}>
        <PostslistAmin />
      </Suspense>
    </>
  );
}
