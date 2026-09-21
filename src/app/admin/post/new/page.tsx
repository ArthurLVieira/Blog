import { Metadata } from 'next';
import MenagePostForm from '@/components/admin/MenagePostForm';
import PageTitle from '@/components/admin/PageTitle';

export const metadata: Metadata = {
  title: 'New post',
};

export default async function AdminNewPage() {
  return (
    <>
      <PageTitle title='Criar post' />
      <MenagePostForm />
    </>
  );
}
