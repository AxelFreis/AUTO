import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../services/auth';
import { routes } from '../../config/routes';

export type UserRole = 'admin' | 'client';

export const useAuthGuard = (requiredRole?: UserRole) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.home, { replace: true });
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      navigate(routes.home, { replace: true });
    }
  }, [isAuthenticated, user, requiredRole, navigate]);

  return { user, isAuthenticated };
};
