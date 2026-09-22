'use client';

import ButtonVariant from '@/components/ButtonVariant';
import CheckBox from '@/components/Checkbox';
import Input from '@/components/Input';
import { MarkdownEditor } from '@/components/MarkDownEditor';
import clsx from 'clsx';
import { SaveIcon } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { ImageUploader } from '../ImageUploader';
import { makePartialPublicPost, PublicPost } from '@/dto/dto';
import createPostAction from '@/actions/post/create-post-action';
import Dialog, { DialogDefalt, DialogProps } from '@/components/Dialog';
import { error } from 'node:console';

type ManagePostFormProps = {
  post?: PublicPost;
};

export default function ManagePostForm({ post }: ManagePostFormProps) {
  const [openDialog, setOpenDialog] = useState<DialogProps>(DialogDefalt);
  const initialState = {
    formState: makePartialPublicPost(post),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    createPostAction,
    initialState,
  );

  const { formState } = state;
  const [contentValue, setContentValue] = useState(post?.content || '');

  useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.forEach(error => {
        setOpenDialog(prev => ({
          ...prev,
          description: prev.description + error,
        }));
      });

      setOpenDialog(prev => ({
        ...prev,
        open: true,
        onConfirm: () => {
          setOpenDialog(DialogDefalt);
        },
        title: 'Erro',
        variant: 'error',
        confirmLabel: 'Ok',
        hideCancel: true,
      }));
    }
  }, [state.errors]);

  return (
    <div className={clsx('p-5 rounded-xl bg-white', 'dark:bg-slate-800')}>
      <form action={action} className='flex flex-col gap-6 h-full w-full'>
        <Input
          direction='col'
          labelText='ID:'
          name='id'
          placeholder='ID gerado automáticamente'
          inputSize='lg'
          type='text'
          tip='required'
          defaultValue={formState.id}
          readOnly
        />

        <Input
          direction='col'
          labelText='Slug:'
          name='slug'
          placeholder='Slug gerada automáticamente'
          inputSize='lg'
          tip='required'
          defaultValue={formState.slug}
          readOnly
        />

        <Input
          direction='col'
          labelText='Autor:'
          name='author'
          placeholder='Digite o nome do autor'
          inputSize='lg'
          tip='default'
          defaultValue={formState.author}
        />

        <Input
          direction='col'
          labelText='Título:'
          name='title'
          placeholder='Digite o título'
          inputSize='lg'
          tip='default'
          defaultValue={formState.title}
        />

        <Input
          direction='col'
          labelText='Excerto:'
          name='excerpt'
          placeholder='Digite o resumo'
          inputSize='lg'
          tip='default'
          defaultValue={formState.excerpt}
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
          name='coverImageUrl'
          placeholder='Digite a URL da imagem'
          inputSize='lg'
          tip='default'
          defaultValue={post?.coverImageUrl || ''}
        />

        <CheckBox
          labelText='Publicar'
          name='published'
          type='checkbox'
          defaultChecked={post?.published || true}
        />

        <ButtonVariant type='submit'>
          <SaveIcon /> Enviar
        </ButtonVariant>
      </form>

      <Dialog
        open={openDialog.open}
        title={openDialog.title}
        variant={openDialog.variant}
        description={openDialog.description}
        hideCancel={openDialog.hideCancel}
        cancelLabel={openDialog.cancelLabel}
        onClose={openDialog.onClose}
        onConfirm={openDialog.onConfirm}
        confirmLabel={openDialog.confirmLabel}
      />
    </div>
  );
}
