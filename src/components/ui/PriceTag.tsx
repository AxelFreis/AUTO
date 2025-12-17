import { cn } from '../../utils/cn';

interface PriceTagProps {
  amount: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  estimated?: boolean;
}

export const PriceTag = ({
  amount,
  currency = '€',
  size = 'md',
  className,
  estimated = false
}: PriceTagProps) => {
  const sizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className={cn('flex items-baseline gap-1', className)}>
      {estimated && <span className="text-sm text-text-secondary">~</span>}
      <span className={cn('font-bold text-text-primary', sizes[size])}>
        {amount.toFixed(2)}
      </span>
      <span className="text-text-secondary text-sm">{currency}</span>
    </div>
  );
};
