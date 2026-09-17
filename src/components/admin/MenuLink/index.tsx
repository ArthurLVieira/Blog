import Link from '@/components/Link';
import LinkNext from 'next/link';
import clsx from 'clsx';
import React, { ComponentProps } from 'react';

interface MenuLinkProps extends ComponentProps<typeof LinkNext> {
  children?: React.ReactNode | undefined;
}

export default function MenuLink({ children, ...props }: MenuLinkProps) {
  return (
    <Link
      className={clsx(
        'flex',
        'items-center',
        'flex-col',
        'justify-center',
        'font-extrabold',
        'rounded',
        'p-2',
        'transition',
        'bg-blue-500 hover:bg-slate-700 dark:bg-blue-100 hover:dark:bg-slate-400',
        'text-slate-100 dark:text-slate-900',
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
