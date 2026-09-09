import FormLayout from '@/layouts/FormLayout';
import clsx from 'clsx';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className={clsx(
        'text-slate-900 dark:text-slate-100',
        'bg-slate-100 dark:bg-slate-900',
        'min-h-screen',
        'font-sans',
        'font-medium',
      )}
    >
      <div className={clsx('max-w-screen-lg', 'mx-auto', 'px-8')}>
        <FormLayout>{children}</FormLayout>
      </div>
    </div>
  );
};

export default Container;
