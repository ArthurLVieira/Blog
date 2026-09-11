import Container from '@/components/Container';
import ErrorMessage from '@/components/ErrorMessage';
import clsx from 'clsx';
import React from 'react';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <ErrorMessage
        status='404'
        title='404 - Not Fount'
        content='Erro 404 - A página que você está tentando acessar não existe
              neste site.'
      />
      <title>404 - Not Fount</title>
      <Container>
        <div
          className={clsx(
            'min-h-[320px]',
            'bg-slate-900 dark:bg-slate-100',
            ' text-slate-100 dark:text-slate-900',
            'mb-16 p-8 rounded-xl',
            'flex items-center justify-center',
            'text-center',
          )}
        >
          <div>
            <h1 className='text-7xl/tight mb-4 font-extrabold'>404</h1>
            <p>
              Erro 404 - A página que você está tentando acessar não existe
              neste site.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NotFoundPage;
