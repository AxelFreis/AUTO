import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBookings, updateBookingStatus } from '../services/bookings';
import { useAdminAuth } from '../services/auth';

export const useBookings = () => {
  const { orgId } = useAdminAuth();

  return useQuery({
    queryKey: ['bookings', orgId],
    queryFn: () => getBookings(orgId!),
    enabled: !!orgId,
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      finalPrice,
    }: {
      id: string;
      status: any;
      finalPrice?: number;
    }) => updateBookingStatus(id, status, finalPrice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });
};
