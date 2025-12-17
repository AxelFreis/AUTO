import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../services/auth';

export const useAdminGuard = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading, checkAdminStatus } = useAdminAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const hasAccess = await checkAdminStatus();
      if (!hasAccess && !isLoading) {
        navigate('/login-admin', { replace: true });
      }
    };

    checkAuth();
  }, [checkAdminStatus, isLoading, navigate]);

  return { isAdmin, isLoading };
};
