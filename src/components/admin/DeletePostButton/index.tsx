'use client';

import { deletePostAction } from '@/actions/post/delete-post-action';
import Button from '@/components/Button';
import Dialog from '@/components/Dialog';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';

interface DeletePostButtonProps {
  id: string;
  title: string;
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({
  id,
  title,
}): React.ReactNode => {
  const [isPending, startTrasition] = useTransition();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [result, setResult] = useState({ error: '', message: '' });

  async function handleClick() {
    setOpen(true);
  }

  async function handleConfirmDialog() {
    startTrasition(async () => {
      const actionResult = await deletePostAction(id);
      setResult({
        error: actionResult?.error ?? '',
        message: actionResult?.message ?? '',
      });
    });

    setOpen(false);

    console.log(result);

    if (result.error || result.error !== '') setOpenError(true);
  }

  async function handleErrorDialog() {
    setOpenError(false);
  }

  return (
    <>
      <Button
        id={id}
        className={clsx(
          'cursor-pointer',
          !isPending && 'hover:scale-120',
          '[&_svg]:w-4 [&_svg]:h-4',
          'transition',
          'disabled:text-slate-400',
          'disabled:cursor-not-allowed',
        )}
        aria-label={`Apagar post: ${title}`}
        title={`Apagar`}
        disabled={isPending}
        onClick={handleClick}
      >
        <Trash2Icon />
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        variant='warning'
        title='Excluir post?'
        description={`Esta ação é permanente e não poderá ser desfeita. Tem certeza que deseja apagar o post: ${title}`}
        onConfirm={handleConfirmDialog}
        confirmLabel='Excluir'
      />

      <Dialog
        open={openError}
        onClose={() => setOpenError(false)}
        variant='error'
        title={result?.error}
        description={result?.message}
        hideCancel
        onConfirm={handleErrorDialog}
        confirmLabel='Ok'
      />
    </>
  );
};

export default DeletePostButton;
