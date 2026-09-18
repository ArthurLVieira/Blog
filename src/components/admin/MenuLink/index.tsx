import Link from 'next/link';
import clsx from 'clsx';

type MenuLinkProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
  'aria-label'?: string;
  title?: string;
};

export default function MenuLink({
  children,
  active = false,
  className,
  ...props
}: MenuLinkProps) {
  return (
    <Link
      {...props}
      className={clsx(
        'flex w-full items-center gap-3 rounded-md px-3 py-2',
        'md:w-auto md:flex-col md:gap-1 md:px-4 md:py-2',
        'text-sm font-extrabold transition-colors duration-200',
        'bg-slate-200 text-slate-700 hover:bg-slate-300',
        'dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600',
        active && [
          'bg-slate-700 text-white hover:bg-slate-800',
          'dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200',
        ],
        className,
      )}
    >
      {children}
    </Link>
  );
}
