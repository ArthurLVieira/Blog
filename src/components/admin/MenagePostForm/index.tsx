import ButtonVariant from '@/components/ButtonVariant';
import CheckBox from '@/components/Checkbox';
import Input from '@/components/Input';
import clsx from 'clsx';
import { SaveIcon } from 'lucide-react';

export default function MenagePostForm() {
  return (
    <div className={clsx('p-5 rounded-xl bg-white', 'dark:bg-slate-800')}>
      <form action='' className='flex flex-col gap-6 h-full w-full'>
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
          tip='default'
        />

        <Input
          direction='col'
          labelText='Nome Completo :'
          placeholder='Digite seu nome'
          inputSize='md'
          tip='default'
          disabled
        />

        <Input
          direction='col'
          labelText='Nome Completo :'
          placeholder='Digite seu nome'
          inputSize='md'
          tip='default'
          readOnly
        />

        <CheckBox labelText='Ativo' />

        <ButtonVariant type='submit'>
          Salvar <SaveIcon />
        </ButtonVariant>
      </form>
    </div>
  );
}
