'use client';

import clsx from 'clsx';
import React, { useId } from 'react';

type InputDirection = 'col' | 'row';
type InputSize = 'sm' | 'md' | 'lg';
type InputTips = 'required' | 'error' | 'info' | 'default';

const InputStyleDirection: Record<InputDirection, string> = {
  col: clsx('flex-col'),
  row: clsx('flex-row items-center'),
};

const InputStyleSize: Record<InputSize, string> = {
  sm: clsx('w-50'),
  md: clsx('w-100'),
  lg: clsx('w-full'),
};

const InputTipsStyle: Record<InputTips, string> = {
  required: clsx(
    // light
    'bg-slate-100 ring-blue-400 focus:ring-blue-600 placeholder-slate-400 text-slate-900',
    'read-only:bg-slate-200 read-only:ring-blue-200 read-only:focus:ring-blue-300 read-only:placeholder-slate-400',
    'disabled:bg-slate-200 disabled:ring-blue-200 disabled:placeholder-slate-400',
    // dark
    'dark:bg-slate-900 dark:ring-blue-500 dark:focus:ring-blue-400 dark:placeholder-slate-500 dark:text-slate-100',
    'dark:read-only:bg-slate-800 dark:read-only:ring-blue-900 dark:read-only:focus:ring-blue-800 dark:read-only:placeholder-slate-600',
    'dark:disabled:bg-slate-800 dark:disabled:ring-blue-900 dark:disabled:placeholder-slate-600',
  ),
  error: clsx(
    // light
    'bg-slate-100 ring-red-400 focus:ring-red-600 placeholder-slate-400 text-red-700',
    'read-only:bg-slate-200 read-only:ring-red-200 read-only:focus:ring-red-300 read-only:placeholder-slate-400 read-only:text-red-400',
    'disabled:bg-slate-200 disabled:ring-red-200 disabled:placeholder-slate-400 disabled:text-red-400',
    // dark
    'dark:bg-slate-900 dark:ring-red-500 dark:focus:ring-red-400 dark:placeholder-slate-500 dark:text-red-300',
    'dark:read-only:bg-slate-800 dark:read-only:ring-red-900 dark:read-only:focus:ring-red-900 dark:read-only:placeholder-slate-600 dark:read-only:text-red-500',
    'dark:disabled:bg-slate-800 dark:disabled:ring-red-900 dark:disabled:placeholder-slate-600 dark:disabled:text-red-500',
  ),
  info: clsx(
    // light
    'bg-slate-100 ring-sky-400 focus:ring-sky-600 placeholder-slate-400 text-slate-900',
    'read-only:bg-slate-200 read-only:ring-sky-200 read-only:focus:ring-sky-300 read-only:placeholder-slate-400',
    'disabled:bg-slate-200 disabled:ring-sky-200 disabled:placeholder-slate-400',
    // dark
    'dark:bg-slate-900 dark:ring-sky-500 dark:focus:ring-sky-400 dark:placeholder-slate-500 dark:text-slate-100',
    'dark:read-only:bg-slate-800 dark:read-only:ring-sky-900 dark:read-only:focus:ring-sky-800 dark:read-only:placeholder-slate-600',
    'dark:disabled:bg-slate-800 dark:disabled:ring-sky-900 dark:disabled:placeholder-slate-600',
  ),
  default: clsx(
    // light
    'bg-slate-100 ring-slate-300 focus:ring-slate-500 placeholder-slate-400 text-slate-900',
    'read-only:bg-slate-200 read-only:ring-slate-300 read-only:focus:ring-slate-400 read-only:placeholder-slate-500',
    'disabled:bg-slate-200 disabled:ring-slate-200 disabled:placeholder-slate-400',
    // dark
    'dark:bg-slate-900 dark:ring-slate-700 dark:focus:ring-slate-400 dark:placeholder-slate-500 dark:text-slate-100',
    'dark:read-only:bg-slate-800 dark:read-only:ring-slate-700 dark:read-only:focus:ring-slate-600 dark:read-only:placeholder-slate-600',
    'dark:disabled:bg-slate-800 dark:disabled:ring-slate-800 dark:disabled:placeholder-slate-600',
  ),
};

type ImputProps = {
  direction?: InputDirection;
  labelText?: string;
  inputSize?: InputSize;
  tip?: InputTips;
  type?: 'text' | 'number' | 'email' | 'password';
} & React.ComponentProps<'input'>;

export default function Input({
  direction = 'col',
  inputSize = 'md',
  type = 'text',
  labelText,
  tip = 'default',
  ...props
}: ImputProps) {
  const id = useId();
  return (
    <div className={clsx('flex', InputStyleDirection[direction], 'gap-2')}>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        {...props}
        type={type}
        className={clsx(
          'text-base/tight ring-2 rounded p-2 transition outline-0',
          'focus:placeholder-transparent focus:outline-none disabled:cursor-not-allowed',

          InputTipsStyle[tip],
          InputStyleSize[inputSize],
          props.className,
        )}
      />
    </div>
  );
}
