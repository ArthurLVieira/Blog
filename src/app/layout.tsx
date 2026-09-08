import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'The blog - este é um blog com next.js',
  description: 'Desecrção da página',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='pt-BR' className='dark'>
      <body>{children}</body>
    </html>
  );
}
