type AdminPostIdProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({ params }: AdminPostIdProps) {
  const { id } = await params;
  return <></>;
}
