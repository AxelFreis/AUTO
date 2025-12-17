import { useQuery } from '@tanstack/react-query';
import { getAdminStats } from '../services/stats';
import { useAdminAuth } from '../services/auth';

export const useAdminStats = () => {
  const { orgId } = useAdminAuth();

  return useQuery({
    queryKey: ['admin-stats', orgId],
    queryFn: () => getAdminStats(orgId!),
    enabled: !!orgId,
    refetchInterval: 30000,
  });
};
