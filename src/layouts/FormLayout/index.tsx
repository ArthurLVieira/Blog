import Footer from '@/components/Footer';
import Heading from '@/components/Heading';

interface FormLayoutProps {
  children: React.ReactNode;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
  return (
    <>
      <Heading href='#' as='h1'>
        The Blog
      </Heading>
      {children}
      <Footer />
    </>
  );
};

export default FormLayout;
