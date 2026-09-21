'use client';

import React from 'react';

interface ButtonProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  children: React.ReactNode;
  id?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  id,
  type = 'button',
  ...props
}) => {
  return (
    <button {...props} type={type}>
      {children}
    </button>
  );
};

export default Button;
