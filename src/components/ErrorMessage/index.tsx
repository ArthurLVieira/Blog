import clsx from 'clsx';
import Container from '../Container';
import React from 'react';

interface ErrorMessageProps {
  title: string;
  status: string;
  content: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  status,
  content,
}) => {
  return (
    <>
      <title>{title}</title>
      <Container>
        <div
          className={clsx(
            'min-h[320px]',
            'bg-slate-900 dark:bg-slate-100',
            ' text-slate-100 dark:text-slate-900',
            'mb-16 p-8 rounded-xl',
            'flex items-center justify-center',
            'text-center',
          )}
        >
          <div>
            <h1 className='text-7xl/tight mb-4 font-extrabold'>{status}</h1>
            <div>{content}</div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ErrorMessage;
