import clsx from 'clsx';
import Link from '../MenuLink';
import React from 'react';

interface HeadingProps {
  children?: React.ReactNode;
  href?: string;
  as: 'h1' | 'h2';
}

const Heading: React.FC<HeadingProps> = ({
  children,
  href = '#',
  as: Tag = 'h2',
}) => {
  const headingClassesMap = {
    h1: 'text-4xl/normal font-extrabold py-8 sm:text-5xl/normal sm:py-9 md:text-6xl/normal md:py-10 lg:text-7xl/normal lg:py-11',
    h2: 'text-1xl/normal font-bold py-2',
  };

  const commonClasses = '';

  return (
    <>
      <header>
        <Tag className={clsx(headingClassesMap[Tag], commonClasses)}>
          <Link
            className='group-hover:text-slate-600 dark:group-hover:text-slate-300 transition'
            href={href}
          >
            {children}
          </Link>
        </Tag>
      </header>
    </>
  );
};

export default Heading;
