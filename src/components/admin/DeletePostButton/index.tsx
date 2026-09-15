'use client';

import { deletePostAction } from '@/actions/post/delete-post-action';
import Button from '@/components/Button';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useTransition } from 'react';

interface DeletePostButtonProps {
  id: string;
  title: string;
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({
  id,
  title,
}): React.ReactNode => {
  const [isPending, startTrasition] = useTransition();

  async function handleClick() {
    startTrasition(async () => {
      await deletePostAction(id);
    });
  }

  return (
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
  );
};

export default DeletePostButton;
