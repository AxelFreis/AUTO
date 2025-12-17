import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  type: z.enum(['interior', 'exterior', 'complete', 'polishing'], {
    errorMap: () => ({ message: 'Type de service invalide' }),
  }),
  duration: z.number().min(15, 'La durée doit être d\'au moins 15 minutes'),
  base_price: z.number().min(0, 'Le prix doit être positif'),
  description: z.string().optional(),
  image_url: z.string().url('URL invalide').optional().or(z.literal('')),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export const bookingUpdateSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']),
  final_price: z.number().min(0).optional(),
  notes: z.string().optional(),
});

export type BookingUpdateData = z.infer<typeof bookingUpdateSchema>;

export const invoiceSchema = z.object({
  booking_id: z.string().uuid(),
  amount: z.number().min(0),
  status: z.enum(['pending', 'paid']),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;
