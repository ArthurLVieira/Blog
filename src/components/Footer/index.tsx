import Link from '../MenuLink';

export default function Footer() {
  return (
    <footer className='mt-20 py-6'>
      <p className='text-center'>
        <span>Copyright &copy; {new Date().getFullYear()} -</span>
        <Link href={'/'}>The Blog</Link>
      </p>
    </footer>
  );
}
