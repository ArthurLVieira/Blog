import clsx from 'clsx';

type PageTitleProps = {
  title: string;
};

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <div
      className={clsx(
        'flex flex-row items-center justify-center w-full rounded',
        'p-5 rounded-xl bg-white dark:bg-slate-800 mb-5',
      )}
    >
      <h2 className='text-4xl font-bold'>{title}</h2>
    </div>
  );
}
