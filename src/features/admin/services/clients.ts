import { supabase } from '../../../services/supabase';
import { Client } from '../models/types';

export const getClients = async (orgId: string): Promise<Client[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      user_id,
      profile:profiles!bookings_user_id_fkey(id, email, full_name, phone, created_at)
    `)
    .eq('org_id', orgId);

  if (error) throw error;

  const clientsMap = new Map<string, Client>();

  data?.forEach((booking: any) => {
    if (booking.profile && !clientsMap.has(booking.user_id)) {
      clientsMap.set(booking.user_id, {
        id: booking.profile.id,
        email: booking.profile.email,
        full_name: booking.profile.full_name,
        phone: booking.profile.phone,
        created_at: booking.profile.created_at,
        bookings_count: 0,
      });
    }
  });

  for (const [userId, client] of clientsMap) {
    const { count } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('org_id', orgId);

    client.bookings_count = count || 0;
  }

  return Array.from(clientsMap.values());
};
