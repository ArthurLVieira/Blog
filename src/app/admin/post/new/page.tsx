import { Metadata } from 'next';
import Input from '@/components/Input';

export const metadata: Metadata = {
  title: 'New post',
};

export default async function AdminNewPage() {
  return (
    <div className='flex flex-col gap-6'>
      <Input
        direction='row'
        labelText='Nome Completo :'
        placeholder='Digite seu nome'
        inputSize='md'
      />
      <Input
        direction='row'
        labelText='Nome Completo :'
        placeholder='Digite seu nome'
        inputSize='md'
        disabled
      />
    </div>
  );
}
