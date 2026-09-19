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
  required: '',
  error: '',
  info: '',
  default: clsx(
    'bg-white ring-slate-400 focus:ring-blue-600',
    'placeholder-slate-300 read-only:bg-slate-300',
    'disabled:bg-slate-300 disabled:placeholder-slate-500 disabled:cursor-not-allowed',
    'read-only:bg-slate-300 read-only:placeholder-slate-500',
    'dark:bg-slate-500 dark:ring-slate-300 dark:focus:ring-slate-50',
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
  tip = 'required',
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
          'focus:placeholder-transparent focus:outline-none',
          'bg-blue-200 text-base/tight',
          'ring-blue-500 focus:ring-blue-600',
          'placeholder-slate-400 read-only:bg-blue-100 read-only:ring-blue-100 read-only:placeholder-slate-500',
          'dark:bg-blue-500 dark:ring-blue-200 dark:focus:ring-white dark:placeholder-slate-300',
          InputTipsStyle[tip],
          InputStyleSize[inputSize],
          props.className,
        )}
      />
    </div>
  );
}
