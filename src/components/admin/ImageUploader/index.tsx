'use client';

import { deleteImageAction } from '@/actions/image/delete-image-action';
import { uploadImageAction } from '@/actions/image/upload-image-action';
import ButtonVariant from '@/components/ButtonVariant';
import Dialog, { DialogDefalt, DialogProps } from '@/components/Dialog';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import clsx from 'clsx';
import { ImageDownIcon, ImageUpIcon } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTrasition] = useTransition();
  const [openDialog, setOpenDialog] = useState<DialogProps>(DialogDefalt);
  const [imgUrl, setImgUrl] = useSessionStorage<string>('upload:image', '');

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) {
      setImgUrl('');
      return;
    }

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const readableMaxSize = IMAGE_UPLOAD_MAX_SIZE / 1024;

      setOpenDialog(prev => ({
        ...prev,
        open: true,
        onConfirm: () => {
          setOpenDialog(DialogDefalt);
        },
        title: 'Erro upload',
        description: `Imagem muito grande. Máx.: ${readableMaxSize}KB.`,
        variant: 'error',
        confirmLabel: 'Ok',
        hideCancel: true,
      }));

      fileInput.value = '';
      setImgUrl('');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTrasition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        setOpenDialog(prev => ({
          ...prev,
          open: true,
          onClose: () => {
            setOpenDialog(DialogDefalt);
          },
          onConfirm: () => {
            setOpenDialog(DialogDefalt);
          },
          title: 'Erro',
          description: `Erro: ${result.error}`,
          variant: 'error',
          confirmLabel: 'Ok',
          hideCancel: true,
        }));
        console.log(openDialog);
        return;
      }

      setOpenDialog(prev => ({
        ...prev,
        open: true,
        onClose: () => {
          setOpenDialog(DialogDefalt);
        },
        onConfirm: () => {
          setOpenDialog(DialogDefalt);
        },
        title: 'Sucesso',
        description: 'Imagem enviada',
        variant: 'success',
        confirmLabel: 'Ok',
        hideCancel: true,
      }));

      setImgUrl(result.url || '');
    });
  }

  return (
    <>
      <div className='felx flex-col gap-4'>
        {(!imgUrl && (
          <ButtonVariant
            type='button'
            className='self-start gap-5'
            onClick={handleChooseFile}
          >
            <ImageUpIcon />
            Enviar imagem
          </ButtonVariant>
        )) || (
          <ButtonVariant
            type='button'
            tip='danger'
            className='self-start mb-5'
            onClick={() => {
              deleteImageAction(imgUrl);
              setImgUrl('');
            }}
          >
            <ImageDownIcon />
            Remover imagem
          </ButtonVariant>
        )}

        {!!imgUrl && (
          <div className='flex flex-col gap-4'>
            <p
              className={clsx(
                'text-blue-400 p-5 rounded ring-2',
                'bg-blue-50 ring-blue-500',
                'dark:bg-slate-900 dark:ring-blue-500',
              )}
            >
              <b className='text-blue-600'>URL:</b> {imgUrl}
            </p>

            <img src={imgUrl} className='rounded-lg' />
          </div>
        )}

        <input
          onChange={handleChange}
          ref={fileInputRef}
          className='hidden'
          name='file'
          type='file'
          accept='image/*'
        />
      </div>

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
    </>
  );
}
