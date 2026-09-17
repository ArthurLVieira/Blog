import LinkNext from 'next/link';
import React, { ComponentProps } from 'react';

interface LinkProps extends ComponentProps<typeof LinkNext> {
  children?: React.ReactNode | undefined;
}

const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return <LinkNext {...props}>{children}</LinkNext>;
};

export default Link;
