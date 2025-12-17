import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Header } from './Header';

interface AppLayoutProps {
  showHeader?: boolean;
  headerTitle?: string;
  showNotifications?: boolean;
}

export const AppLayout = ({
  showHeader = true,
  headerTitle,
  showNotifications = false
}: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-[72px]">
      {showHeader && <Header title={headerTitle} showNotifications={showNotifications} />}
      <main className="max-w-screen-xl mx-auto">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};
