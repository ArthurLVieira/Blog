import Heading from '@/components/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <Heading as='h2' href='#'>
      Olá Mundo
    </Heading>
  );
}
