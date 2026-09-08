import clsx from 'clsx';

interface SpinLoaderProps {
  className?: string;
}

const SpinLoader: React.FC<SpinLoaderProps> = ({ className }) => {
  return (
    <div className={clsx('flex', 'items-center', 'justify-center', className)}>
      <div
        className={clsx(
          'w-10',
          'h-10',
          'border-5',
          'border-t-transparent',
          'border-slate-900 dark:border-s-amber-100',
          'rounded-full',
          'animate-spin',
        )}
      ></div>
    </div>
  );
};

export default SpinLoader;
