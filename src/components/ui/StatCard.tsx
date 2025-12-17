import { LucideIcon } from 'lucide-react';
import { Card } from './Card';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, className }: StatCardProps) => {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
          {trend && (
            <p
              className={cn(
                'text-xs mt-2',
                trend.isPositive ? 'text-success' : 'text-error'
              )}
            >
              {trend.value}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
};
