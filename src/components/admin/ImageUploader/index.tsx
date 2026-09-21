'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import ButtonVariant from '@/components/ButtonVariant';
import Dialog, { DialogDefalt, DialogProps } from '@/components/Dialog';
import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import { ImageUpIcon } from 'lucide-react';
import { stringify } from 'querystring';
import { useRef, useState, useTransition } from 'react';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTrasition] = useTransition();
  const [openDialog, setOpenDialog] = useState<DialogProps>(DialogDefalt);
  const [imgUrl, setImgUrl] = useState<string>('');

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) return;

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const readableMaxSize = IMAGE_UPLOAD_MAX_SIZE / 1024;

      setOpenDialog(prev => ({
        ...prev,
        open: true,
        onClose: () => {
          setOpenDialog(DialogDefalt);
        },
        title: 'Erro upload',
        description: `Imagem muito grande. Máx.: ${readableMaxSize}KB.`,
        variant: 'error',
        cancelLabel: 'Ok',
        hideCancel: true,
      }));

      fileInput.value = '';
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
          title: 'Erro',
          description: `Erro: ${result.error}`,
          variant: 'error',
          confirmLabel: 'Ok',
          hideCancel: true,
        }));

        result;
      }

      setOpenDialog(prev => ({
        ...prev,
        open: true,
        onClose: () => {
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
        <ButtonVariant
          type='button'
          className='self-start'
          onClick={handleChooseFile}
        >
          <ImageUpIcon />
          Enviar imagem
        </ButtonVariant>

        {!!imgUrl && (
          <div className='flex flex-col gap-4'>
            <p className='text-blue-400'>
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
        confirmLabel={openDialog.confirmLabel}
        onConfirm={openDialog.onConfirm}
      />
    </>
  );
}
