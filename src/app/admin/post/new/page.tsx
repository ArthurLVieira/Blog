import { Metadata } from 'next';
import Input from '@/components/Input';
import CheckBox from '@/components/Checkbox';
import ButtonVariant from '@/components/ButtonVariant';
import { SaveIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'New post',
};

export default async function AdminNewPage() {
  return (
    <div className='flex flex-col gap-6'>
      <Input
        direction='col'
        labelText='Nome Completo :'
        placeholder='Digite seu nome'
        inputSize='md'
      />
      <Input
        direction='col'
        labelText='Nome Completo :'
        placeholder='Digite seu nome'
        inputSize='md'
        disabled
      />

      <CheckBox labelText='Ativo' />

      <ButtonVariant type='submit'>
        Salvar <SaveIcon />
      </ButtonVariant>
    </div>
  );
}
