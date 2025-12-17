import { supabase } from '../../../services/supabase';
import { Booking } from '../models/types';

export const getBookings = async (orgId: string): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(*),
      profile:profiles(id, email, full_name, phone)
    `)
    .eq('org_id', orgId)
    .order('date', { ascending: false })
    .order('time', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const updateBookingStatus = async (
  id: string,
  status: Booking['status'],
  finalPrice?: number
): Promise<Booking> => {
  const updateData: any = { status };
  if (finalPrice !== undefined) {
    updateData.final_price = finalPrice;
  }

  const { data, error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
