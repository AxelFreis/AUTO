import { cn } from '../../utils/cn';

interface LoadingBarProps {
  progress?: number;
  className?: string;
  label?: string;
}

export const LoadingBar = ({ progress, className, label }: LoadingBarProps) => {
  return (
    <div className={cn('w-full', className)}>
      {label && <p className="text-sm text-text-secondary mb-2">{label}</p>}
      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            'h-full bg-primary transition-all duration-300',
            progress === undefined && 'animate-pulse w-full'
          )}
          style={progress !== undefined ? { width: `${progress}%` } : undefined}
        />
      </div>
    </div>
  );
};
