'use client';

import clsx from 'clsx';
import React, { useId } from 'react';

type InputDirection = 'col' | 'row';
type InputSize = 'sm' | 'md' | 'lg';

const InputClassDirection: Record<InputDirection, string> = {
  col: clsx('flex-col'),
  row: clsx('flex-row items-center'),
};

const InputClassSize: Record<InputSize, string> = {
  sm: clsx('w-50'),
  md: clsx('w-100'),
  lg: clsx('w-full'),
};

type ImputProps = {
  direction?: InputDirection;
  labelText?: string;
  inputSize?: InputSize;
} & React.ComponentProps<'input'>;

export default function Input({
  direction = 'col',
  inputSize = 'md',
  labelText,
  ...props
}: ImputProps) {
  const id = useId();
  return (
    <div className={clsx('flex', InputClassDirection[direction], 'gap-2')}>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        {...props}
        type={props.type || 'text'}
        className={clsx(
          'bg-white outline-0 text-base/tight',
          'ring-2 ring-slate-400 rounded',
          'p-2 transition focus:ring-blue-600',
          'placeholder-slate-300',
          'focus:placeholder-transparent focus:outline-none',
          'disabled:bg-slate-300 disabled:placeholder-slate-50 disabled:cursor-not-allowed',
          'dark:bg-slate-500 dark:ring-slate-300 dark:focus:ring-slate-50',
          InputClassSize[inputSize],
          props.className,
        )}
      />
    </div>
  );
}
