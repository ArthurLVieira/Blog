import ErrorMessage from '@/components/ErrorMessage';
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
    </>
  );
};

export default NotFoundPage;
