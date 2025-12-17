import { LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../services/auth';
import { cn } from '../../../utils/cn';

interface AdminHeaderProps {
  title: string;
  className?: string;
}

export const AdminHeader = ({ title, className }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const { logoutAdmin } = useAdminAuth();

  const handleLogout = async () => {
    await logoutAdmin();
    navigate('/login-admin', { replace: true });
  };

  return (
    <header className={cn('sticky top-0 z-40 bg-background border-b border-slate-800', className)}>
      <div className="flex items-center justify-between h-[56px] px-4">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-text-primary" />
          </button>
          <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 text-text-secondary" />
        </button>
      </div>
    </header>
  );
};
