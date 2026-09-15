'use client';

import React from 'react';

interface ButtonProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  children: React.ReactNode;
  id?: string;
}

const Button: React.FC<ButtonProps> = ({ children, id, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default Button;
