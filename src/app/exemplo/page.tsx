'use client';
import Dialog from '@/components/Dialog';
import { useState } from 'react';

export default function ExemploPage() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Abrir aviso</button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        variant='warning'
        title='Excluir post?'
        description='Esta ação é permanente e não poderá ser desfeita.'
        onConfirm={() => setOpen(false)}
        confirmLabel='Excluir'
      />

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        variant='success'
        title='Post publicado!'
        description='Seu artigo já está disponível no blog.'
        hideCancel
        onConfirm={() => setConfirmOpen(false)}
      />
    </>
  );
}
