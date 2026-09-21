'use client';

import ButtonVariant from '@/components/ButtonVariant';
import Dialog from '@/components/Dialog';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useState } from 'react';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openError, setOpenError] = useState(false);

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
      setOpenError(() => true);
      fileInput.value = '';
      return;
    }
  }
  return (
    <>
      <div className='felx flex-col gap-2'>
        <ButtonVariant
          type='button'
          className='self-start'
          onClick={handleChooseFile}
        >
          <ImageUpIcon />
          Enviar imagem
        </ButtonVariant>
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
        open={openError}
        title='Erro upload'
        description='Tamanho da imagem maior que o permitido !'
        hideCancel
        cancelLabel='Ok'
        onClose={() => setOpenError(() => false)}
      />
    </>
  );
}
