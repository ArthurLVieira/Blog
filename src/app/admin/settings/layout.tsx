import MenuAdmin from '@/components/admin/Menu';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function AdminRootPostLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}
