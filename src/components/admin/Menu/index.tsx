'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { HouseIcon, FileTextIcon, UsersIcon, SettingsIcon } from 'lucide-react';
import MenuLink from '../MenuLink';

type MenuItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const MENU_ITEMS: MenuItem[] = [
  { href: '/admin', label: 'Início', icon: <HouseIcon size={20} /> },
  { href: '/admin/post', label: 'Posts', icon: <FileTextIcon size={20} /> },
  { href: '/admin/users', label: 'Usuários', icon: <UsersIcon size={20} /> },
  {
    href: '/admin/settings',
    label: 'Config',
    icon: <SettingsIcon size={20} />,
  },
];

export default function MenuAdmin() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className={clsx(
        'mb-5 rounded-lg shadow-sm',
        'bg-slate-100 dark:bg-slate-800',
        'border border-slate-200 dark:border-slate-700',
      )}
      aria-label='Menu administrativo'
    >
      <div className='flex items-center justify-between px-4 py-3 md:hidden'>
        <span className='text-sm font-bold text-slate-700 dark:text-slate-200'>
          Menu
        </span>
        <button
          type='button'
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-controls='menu-admin-list'
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          className={clsx(
            'flex h-9 w-9 items-center justify-center rounded-md transition',
            'bg-slate-200 hover:bg-slate-300',
            'dark:bg-slate-700 dark:hover:bg-slate-600',
            'text-slate-800 dark:text-slate-100',
          )}
        >
          <span className='relative block h-4 w-5'>
            <span
              className={clsx(
                'absolute left-0 h-0.5 w-5 bg-current transition-all duration-300',
                open ? 'top-2 rotate-45' : 'top-0',
              )}
            />
            <span
              className={clsx(
                'absolute left-0 top-2 h-0.5 w-5 bg-current transition-all duration-300',
                open && 'opacity-0',
              )}
            />
            <span
              className={clsx(
                'absolute left-0 h-0.5 w-5 bg-current transition-all duration-300',
                open ? 'top-2 -rotate-45' : 'top-4',
              )}
            />
          </span>
        </button>
      </div>

      <ul
        id='menu-admin-list'
        className={clsx(
          'overflow-hidden transition-all duration-300',
          'flex flex-col gap-1 px-2',
          open
            ? 'max-h-96 pb-2 opacity-100'
            : 'max-h-0 opacity-0 md:max-h-none md:opacity-100',
          'md:flex-row md:items-center md:justify-center md:gap-3 md:px-4 md:py-3',
        )}
      >
        {MENU_ITEMS.map(item => (
          <li key={item.href}>
            <MenuLink
              href={item.href}
              aria-label={item.label}
              title={item.label}
              active={pathname === item.href}
              onClick={() => setOpen(false)}
            >
              {item.icon}
              <span className='text-xs font-bold md:text-[11px]'>
                {item.label}
              </span>
            </MenuLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
