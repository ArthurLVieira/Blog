'use client';

import { useEffect } from 'react';
import clsx from 'clsx';
import Button from '../Button';

type DialogVariant = 'info' | 'warning' | 'error' | 'success' | 'dialog';

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  variant?: DialogVariant;
  confirmLabel?: string;
  cancelLabel?: string;
  hideCancel?: boolean;
  loading?: boolean;
};

export const DialogDefalt: DialogProps = {
  open: false,
  onClose: () => {},
  onConfirm: () => {},
  title: '',
  description: '',
  children: '',
  variant: 'dialog',
  confirmLabel: '',
  cancelLabel: '',
  hideCancel: false,
  loading: false,
};

const variantConfig: Record<
  DialogVariant,
  {
    icon: React.ReactNode;
    ring: string;
    bgIcon: string;
    confirmClass: string;
    defaultConfirmLabel: string;
  }
> = {
  info: {
    bgIcon: 'bg-sky-100 text-sky-600',
    ring: 'ring-sky-200',
    confirmClass: 'bg-sky-500 hover:bg-sky-600 text-white',
    defaultConfirmLabel: 'Entendi',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-10 h-10'>
        <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
        <path
          d='M12 8h.01M11 12h1v5h1'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  warning: {
    bgIcon: 'bg-amber-100 text-amber-600',
    ring: 'ring-amber-200',
    confirmClass: 'bg-amber-500 hover:bg-amber-600 text-white',
    defaultConfirmLabel: 'Continuar',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-10 h-10'>
        <path
          d='M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinejoin='round'
        />
        <path
          d='M12 9v4M12 17h.01'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  error: {
    bgIcon: 'bg-red-100 text-red-600',
    ring: 'ring-red-200',
    confirmClass: 'bg-red-500 hover:bg-red-600 text-white',
    defaultConfirmLabel: 'Fechar',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-10 h-10'>
        <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
        <path
          d='M15 9l-6 6M9 9l6 6'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  success: {
    bgIcon: 'bg-emerald-100 text-emerald-600',
    ring: 'ring-emerald-200',
    confirmClass: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    defaultConfirmLabel: 'OK',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-10 h-10'>
        <circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
        <path
          d='M8 12.5l2.5 2.5L16 9.5'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
  dialog: {
    bgIcon: 'bg-slate-200 text-slate-700',
    ring: 'ring-slate-300',
    confirmClass: 'bg-slate-800 hover:bg-slate-900 text-white',
    defaultConfirmLabel: 'Confirmar',
    icon: (
      <svg viewBox='0 0 24 24' fill='none' className='w-10 h-10'>
        <path
          d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinejoin='round'
        />
      </svg>
    ),
  },
};

export default function Dialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  children,
  variant = 'dialog',
  confirmLabel,
  cancelLabel = 'Cancelar',
  hideCancel = false,
  loading = false,
}: DialogProps) {
  // Fecha com ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    // Trava scroll do body
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const cfg = variantConfig[variant];

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='dialog-title'
      className={clsx(
        'fixed inset-0 z-50',
        'bg-black/30 backdrop-blur-sm',
        'flex items-center justify-center',
        'animate-[fadeIn_.2s_ease-out]',
      )}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className={clsx(
          'bg-white shadow-xl',
          'p-6 rounded-2xl',
          'max-w-md w-full mx-6',
          'flex flex-col items-center text-center gap-3',
          'animate-[popIn_.25s_cubic-bezier(.2,.9,.3,1.3)]',
        )}
      >
        {/* Ícone animado */}
        <div
          className={clsx(
            'flex items-center justify-center',
            'w-20 h-20 rounded-full',
            'ring-4',
            cfg.bgIcon,
            cfg.ring,
            'animate-[bounceIn_.6s_ease-out]',
            // animação contínua conforme variante
            variant === 'warning' && 'animate-wiggle',
            variant === 'error' && 'animate-pulse-ring',
            variant === 'success' && 'animate-pop',
            variant === 'info' && 'animate-float',
          )}
        >
          {cfg.icon}
        </div>

        <h3 id='dialog-title' className='text-lg font-semibold text-slate-900'>
          {title}
        </h3>

        {description && (
          <p className='text-sm text-slate-600 leading-relaxed'>
            {description}
          </p>
        )}

        {children && <div className='w-full mt-1'>{children}</div>}

        <div className='flex items-center justify-center gap-3 mt-4 w-full'>
          {!hideCancel && (
            <Button
              onClick={onClose}
              disabled={loading}
              className='bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-50'
            >
              {cancelLabel}
            </Button>
          )}
          {onConfirm && (
            <Button
              onClick={onConfirm}
              disabled={loading}
              className={clsx(
                'rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-50',
                cfg.confirmClass,
              )}
            >
              {loading
                ? 'Aguarde...'
                : (confirmLabel ?? cfg.defaultConfirmLabel)}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
