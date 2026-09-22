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
          labelText='ID:'
          name='id'
          placeholder='ID gerado automáticamente'
          inputSize='lg'
          type='text'
          tip='required'
          readOnly
        />

        <Input
          direction='col'
          labelText='Slug:'
          name='slug'
          placeholder='Slug gerada automáticamente'
          inputSize='lg'
          tip='required'
          readOnly
        />

        <Input
          direction='col'
          labelText='Autor:'
          name='author'
          placeholder='Digite o nome do autor'
          inputSize='lg'
          tip='default'
        />

        <Input
          direction='col'
          labelText='Título:'
          name='title'
          placeholder='Digite o título'
          inputSize='lg'
          tip='default'
        />

        <Input
          direction='col'
          labelText='Excerto:'
          name='excerpt'
          placeholder='Digite o resumo'
          inputSize='lg'
          tip='default'
        />

        <MarkdownEditor
          labelText='Conteúdo:'
          disabled={false}
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
        />

        <ImageUploader />

        <Input
          direction='col'
          labelText='URL da imagem de capa:'
          name='cover ImageUrl'
          placeholder='Digite a URL da imagem'
          inputSize='lg'
          tip='default'
        />

        <CheckBox labelText='Publicar' name='published' type='checkbox' />

        <ButtonVariant type='submit'>
          <SaveIcon /> Enviar
        </ButtonVariant>
      </form>
    </div>
  );
}
