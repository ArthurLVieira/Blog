import Link from 'next/link';
import React, { ComponentProps } from 'react';

interface MenuLinkProps extends ComponentProps<typeof Link> {
  children?: React.ReactNode | undefined;
}

const MenuLink: React.FC<MenuLinkProps> = ({ children, ...props }) => {
  return <Link {...props}>{children}</Link>;
};

export default MenuLink;
