import { useQuery } from '@tanstack/react-query';
import { getClients } from '../services/clients';
import { useAdminAuth } from '../services/auth';

export const useClients = () => {
  const { orgId } = useAdminAuth();

  return useQuery({
    queryKey: ['clients', orgId],
    queryFn: () => getClients(orgId!),
    enabled: !!orgId,
  });
};
