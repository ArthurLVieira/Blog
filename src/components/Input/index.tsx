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
    'bg-blue-100 ring-blue-400 focus:ring-blue-600 placeholder-slate-400',
    'read-only:bg-blue-100 read-only:ring-blue-100 read-only:placeholder-slate-400',
    'disabled:bg-blue-100 disabled:ring-blue-100 disabled:placeholder-slate-400',
    'dark:bg-slate-600 dark:ring-slate-300 dark:focus:ring-white dark:placeholder-slate-300',
  ),
  error: '',
  info: '',
  default: clsx(),
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
          'focus:placeholder-transparent focus:outline-none disabled:cursor-not-allowed',
          'bg-slate-200 ring-slate-400 focus:ring-blue-600 placeholder-slate-300',
          'read-only:bg-slate-200 read-only:ring-slate-200 focus:ring-slate-600 read-only:placeholder-300',
          'disabled:bg-slate-200 disabled:placeholder-slate-500',
          'dark:bg-inherit dark:ring-slate-300 dark:focus:ring-white dark:placeholder-slate-300',
          'dark:read-only:bg-slate-200 dark:read-only:ring-slate-200 dark:focus:read-only:ring-blue-600',
          InputTipsStyle[tip],
          InputStyleSize[inputSize],
          props.className,
        )}
      />
    </div>
  );
}
