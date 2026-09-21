'use client';

import ButtonVariant from '@/components/ButtonVariant';
import CheckBox from '@/components/Checkbox';
import Input from '@/components/Input';
import { MarkdownEditor } from '@/components/MarkDownEditor';
import clsx from 'clsx';
import { SaveIcon } from 'lucide-react';
import { useState } from 'react';
import { ImageUploader } from '../ImageUploader';

export default function MenagePostForm() {
  const [contentValue, setContentValue] = useState('');

  return (
    <div className={clsx('p-5 rounded-xl bg-white', 'dark:bg-slate-800')}>
      <form action='' className='flex flex-col gap-6 h-full w-full'>
        <Input
          direction='col'
          labelText='Nome Completo :'
          placeholder='Digite seu nome'
          inputSize='lg'
          tip='required'
        />

        <ImageUploader />

        <Input
          direction='col'
          labelText='Nome Completo :'
          placeholder='Digite seu nome'
          inputSize='lg'
          tip='required'
          readOnly
        />

        <Input
          direction='col'
          labelText='Nome Completo :'
          placeholder='Digite seu nome'
          inputSize='lg'
          tip='required'
          disabled
        />

        <CheckBox labelText='Ativo' />

        <MarkdownEditor
          labelText='Conteúdo'
          disabled={false}
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
        />

        <ButtonVariant type='submit'>
          Salvar <SaveIcon />
        </ButtonVariant>
      </form>
    </div>
  );
}
