'use client';
import ErrorMessage from '@/components/ErrorMessage';
import { useEffect } from 'react';

type RootErrorProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage({ error, reset }: RootErrorProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <ErrorMessage
      title='Internal Server Error'
      status='501'
      content='ocorreu um erro que a aplicação não conseguiu recuperar. Tente novamente'
    />
  );
}
