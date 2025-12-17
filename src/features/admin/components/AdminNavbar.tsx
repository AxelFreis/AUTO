import { LayoutDashboard, Briefcase, Users, Calendar, FileText } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../utils/cn';

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/prestations', icon: Briefcase, label: 'Services' },
  { to: '/admin/clients', icon: Users, label: 'Clients' },
  { to: '/admin/planning', icon: Calendar, label: 'Planning' },
  { to: '/admin/facturation', icon: FileText, label: 'Factures' },
];

export const AdminNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background-card border-t border-slate-800 z-50">
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="flex items-center justify-around h-[72px]">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors',
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
