import { Metadata } from 'next';
import PageTitle from '@/components/admin/PageTitle';
import ManagePostForm from '@/components/admin/MenagePostForm';

export const metadata: Metadata = {
  title: 'New post',
};

export default async function AdminNewPage() {
  return (
    <>
      <PageTitle title='Criar post' />
      <ManagePostForm />
    </>
  );
}
