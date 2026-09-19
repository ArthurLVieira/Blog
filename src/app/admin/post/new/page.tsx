import { Metadata } from 'next';
import Input from '@/components/Input';
import CheckBox from '@/components/Checkbox';
import ButtonVariant from '@/components/ButtonVariant';
import { SaveIcon } from 'lucide-react';
import MenagePostForm from '@/components/admin/MenagePostForm';

export const metadata: Metadata = {
  title: 'New post',
};

export default async function AdminNewPage() {
  return <MenagePostForm />;
}
