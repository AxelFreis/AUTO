import { Menu, Bell } from 'lucide-react';
import { cn } from '../../utils/cn';

interface HeaderProps {
  title?: string;
  showNotifications?: boolean;
  className?: string;
}

export const Header = ({ title, showNotifications = false, className }: HeaderProps) => {
  return (
    <header className={cn('sticky top-0 z-40 bg-background border-b border-slate-800', className)}>
      <div className="flex items-center justify-between h-[56px] px-4">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-text-primary" />
          </button>
          {title && <h1 className="text-lg font-semibold text-text-primary">{title}</h1>}
        </div>
        {showNotifications && (
          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-text-primary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>
        )}
      </div>
    </header>
  );
};
