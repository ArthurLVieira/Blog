import ManagePostForm from '@/components/admin/MenagePostForm';
import PageTitle from '@/components/admin/PageTitle';
import { makePublicPostFromDb } from '@/dto/dto';
import { findPostByIdAdmin } from '@/lib/post/queries/admin';

type AdminPostIdProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({ params }: AdminPostIdProps) {
  const { id } = await params;
  const post = await findPostByIdAdmin(id);
  const publicPost = makePublicPostFromDb(post);

  return (
    <>
      <PageTitle title='Post' />
      <ManagePostForm post={publicPost} />
    </>
  );
}
