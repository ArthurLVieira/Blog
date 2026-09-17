import { HouseIcon } from 'lucide-react';
import MenuLink from '../MenuLink';

export default function MenuAdmin() {
  return (
    <nav className='flex items-center justify-center gap-5 mb-5'>
      <MenuLink href={'/admin/post'} aria-label='Posts' title='Posts'>
        <HouseIcon />
      </MenuLink>
      <MenuLink href={'/admin/post'} aria-label='Posts' title='Posts'>
        <HouseIcon />
      </MenuLink>
    </nav>
  );
}
