import { cacheTag } from 'next/cache';
import Link from '../Link';

export default async function Footer() {
  'use cache';
  cacheTag('footer');
  return (
    <footer className='mt-20 py-6'>
      <p className='text-center'>
        <span>Copyright &copy; {new Date().getFullYear()} -</span>
        <Link href={'/'}>The Blog</Link>
      </p>
    </footer>
  );
}
