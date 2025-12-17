import { supabase } from '../../../services/supabase';
import { Client } from '../models/types';

export const getClients = async (orgId: string): Promise<Client[]> => {
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('user_id')
    .eq('org_id', orgId);

  if (error) throw error;

  const uniqueUserIds = [...new Set(bookings?.map((b) => b.user_id) || [])];

  if (uniqueUserIds.length === 0) return [];

  const clientsData: Client[] = [];

  for (const userId of uniqueUserIds) {
    const { data: userData } = await supabase.auth.admin.getUserById(userId);

    const { count } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('org_id', orgId);

    if (userData?.user) {
      clientsData.push({
        id: userData.user.id,
        email: userData.user.email || '',
        phone: userData.user.user_metadata?.phone,
        created_at: userData.user.created_at,
        bookings_count: count || 0,
      });
    }
  }

  return clientsData;
};
