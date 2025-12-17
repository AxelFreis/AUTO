import { supabase } from '../../../services/supabase';
import { AdminStats } from '../models/types';

export const getAdminStats = async (orgId: string): Promise<AdminStats> => {
  const today = new Date().toISOString().split('T')[0];

  const { data: bookings, error: bookingsError } = await supabase
    .from('bookings')
    .select('*')
    .eq('org_id', orgId);

  if (bookingsError) throw bookingsError;

  const { data: invoices, error: invoicesError } = await supabase
    .from('invoices')
    .select('*')
    .eq('org_id', orgId);

  if (invoicesError) throw invoicesError;

  const bookingsCount = bookings?.length || 0;
  const pendingBookings = bookings?.filter((b) => b.status === 'pending').length || 0;
  const completedToday = bookings?.filter(
    (b) => b.status === 'completed' && b.date === today
  ).length || 0;

  const revenue = invoices?.reduce((sum, inv) => {
    if (inv.status === 'paid') {
      return sum + Number(inv.amount);
    }
    return sum;
  }, 0) || 0;

  const monthlyRevenue = calculateMonthlyRevenue(invoices || []);

  return {
    bookings_count: bookingsCount,
    revenue,
    pending_bookings: pendingBookings,
    completed_today: completedToday,
    monthly_revenue: monthlyRevenue,
  };
};

const calculateMonthlyRevenue = (invoices: any[]) => {
  const monthlyData: { [key: string]: number } = {};
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

  invoices.forEach((invoice) => {
    if (invoice.status === 'paid' && invoice.paid_at) {
      const date = new Date(invoice.paid_at);
      const monthKey = `${months[date.getMonth()]}`;
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + Number(invoice.amount);
    }
  });

  return months.map((month) => ({
    month,
    revenue: monthlyData[month] || 0,
  })).slice(-6);
};
