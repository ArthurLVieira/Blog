import FormLayout from '@/layouts/FormLayout';
import clsx from 'clsx';
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <FormLayout>
      <div
        className={clsx(
          'min-h[320px] bg-slate-900 text-slate-100',
          'mb-16 p-8 rounded-xl',
          'flex items-center justify-center',
          'text-center',
        )}
      >
        <div>
          <h1 className='text-7xl/tight mb-4 font-extrabold'>404</h1>
          <p>
            Erro 404 - A página que está tentando acessar não existe e/ou não
            esta disponível.
          </p>
        </div>
      </div>
    </FormLayout>
  );
};

export default NotFoundPage;
