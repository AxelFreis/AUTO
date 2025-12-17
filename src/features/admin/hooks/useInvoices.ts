import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getInvoices,
  createInvoice,
  updateInvoiceStatus,
  generateInvoicePDF,
  sendPaymentReminder,
} from '../services/invoices';
import { useAdminAuth } from '../services/auth';

export const useInvoices = () => {
  const { orgId } = useAdminAuth();

  return useQuery({
    queryKey: ['invoices', orgId],
    queryFn: () => getInvoices(orgId!),
    enabled: !!orgId,
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  const { orgId } = useAdminAuth();

  return useMutation({
    mutationFn: ({
      bookingId,
      userId,
      amount,
    }: {
      bookingId: string;
      userId: string;
      amount: number;
    }) => createInvoice(orgId!, bookingId, userId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });
};

export const useUpdateInvoiceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'pending' | 'paid' }) =>
      updateInvoiceStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });
};

export const useGenerateInvoicePDF = () => {
  return useMutation({
    mutationFn: generateInvoicePDF,
  });
};

export const useSendPaymentReminder = () => {
  return useMutation({
    mutationFn: ({
      invoiceId,
      userEmail,
    }: {
      invoiceId: string;
      userEmail: string;
    }) => sendPaymentReminder(invoiceId, userEmail),
  });
};
