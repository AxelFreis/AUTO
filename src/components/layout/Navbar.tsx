import { Home, FileText, Calendar, User, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { routes } from '../../config/routes';
import { useAuthStore } from '../../services/auth';

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { to: routes.home, icon: Home, label: 'Accueil' },
  { to: routes.quote, icon: FileText, label: 'Devis' },
  { to: routes.booking, icon: Calendar, label: 'Réserver' },
  { to: routes.account, icon: User, label: 'Compte', requiresAuth: true },
  { to: routes.admin, icon: Settings, label: 'Admin', requiresAuth: true, adminOnly: true },
];

export const Navbar = () => {
  const { user, isAuthenticated } = useAuthStore();

  const filteredItems = navItems.filter((item) => {
    if (item.requiresAuth && !isAuthenticated) return false;
    if (item.adminOnly && user?.role !== 'admin') return false;
    return true;
  });

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background-card border-t border-slate-800 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-around h-[72px]">
          {filteredItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn('w-6 h-6', isActive && 'stroke-[2.5]')} />
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
