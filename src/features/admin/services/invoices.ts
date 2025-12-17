import { supabase } from '../../../services/supabase';
import { Invoice } from '../models/types';

export const getInvoices = async (orgId: string): Promise<Invoice[]> => {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      booking:bookings(
        *,
        service:services(*)
      )
    `)
    .eq('org_id', orgId)
    .order('issued_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const createInvoice = async (
  orgId: string,
  bookingId: string,
  userId: string,
  amount: number
): Promise<Invoice> => {
  const invoiceNumber = `INV-${Date.now()}`;

  const { data, error } = await supabase
    .from('invoices')
    .insert({
      org_id: orgId,
      booking_id: bookingId,
      user_id: userId,
      invoice_number: invoiceNumber,
      amount,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateInvoiceStatus = async (
  id: string,
  status: 'pending' | 'paid'
): Promise<Invoice> => {
  const updateData: any = { status };
  if (status === 'paid') {
    updateData.paid_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('invoices')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const generateInvoicePDF = async (invoice: Invoice): Promise<string> => {
  return `data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKL01lZGlhQm94IFswIDAgNTk1IDg0Ml0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgoxMDAgNzAwIFRkCihGYWN0dXJlKSBUagpFVApKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCjAwMDAwMDAyMjcgMDAwMDAgbiAKMDAwMDAwMDI5NCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjM4OAolJUVPRgo=`;
};

export const sendPaymentReminder = async (
  invoiceId: string,
  userEmail: string
): Promise<void> => {
  console.log(`Sending payment reminder for invoice ${invoiceId} to ${userEmail}`);

  await new Promise(resolve => setTimeout(resolve, 1000));
};
