import { Outlet } from 'react-router-dom';
import { AdminNavbar } from './AdminNavbar';
import { AdminHeader } from './AdminHeader';
import { useAdminGuard } from '../hooks/useAdminGuard';

interface AdminLayoutProps {
  title: string;
}

export const AdminLayout = ({ title }: AdminLayoutProps) => {
  const { isLoading } = useAdminGuard();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-text-secondary">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-[72px]">
      <AdminHeader title={title} />
      <main className="max-w-screen-xl mx-auto">
        <Outlet />
      </main>
      <AdminNavbar />
    </div>
  );
};
