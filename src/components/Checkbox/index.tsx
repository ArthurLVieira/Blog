'use client';

import clsx from 'clsx';
import { ComponentProps, useId } from 'react';

type ImputProps = {
  labelText?: string;
  className?: string;
} & ComponentProps<'input'>;

export default function CheckBox({ labelText, ...props }: ImputProps) {
  const id = useId();
  return (
    <form action=''>
      <div className={clsx('flex flex-row gap-3 items-center')}>
        <input
          {...props}
          type='checkbox'
          className={clsx(
            'w-4 h-4 outline-none focus:ring-2 focus:ring-blue-500',
            props.className,
          )}
        />
        {labelText && (
          <label className='' htmlFor={id}>
            {labelText}
          </label>
        )}
      </div>
    </form>
  );
}
