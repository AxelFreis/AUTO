export interface Organization {
  id: string;
  name: string;
  created_at: string;
}

export interface Service {
  id: string;
  org_id: string;
  name: string;
  type: 'interior' | 'exterior' | 'complete' | 'polishing';
  duration: number;
  base_price: number;
  description?: string;
  image_url?: string;
  created_at: string;
}

export interface Booking {
  id: string;
  org_id: string;
  user_id: string;
  service_id: string;
  date: string;
  time: string;
  location_type: 'home' | 'work';
  address?: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  estimated_price: number;
  final_price?: number;
  photos?: string[];
  notes?: string;
  google_event_id?: string;
  created_at: string;
  service?: Service;
  profile?: {
    id: string;
    email: string;
    full_name?: string;
    phone?: string;
  };
}

export interface Invoice {
  id: string;
  org_id: string;
  booking_id: string;
  user_id: string;
  invoice_number: string;
  amount: number;
  status: 'pending' | 'paid';
  pdf_url?: string;
  issued_at: string;
  paid_at?: string;
  created_at: string;
  booking?: Booking;
  user?: {
    id: string;
    email: string;
  };
}

export interface CalendarCredentials {
  id: string;
  org_id: string;
  provider: 'google';
  access_token: string;
  refresh_token: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface AdminStats {
  bookings_count: number;
  revenue: number;
  pending_bookings: number;
  completed_today: number;
  monthly_revenue: Array<{ month: string; revenue: number }>;
}

export interface Client {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  created_at: string;
  bookings_count: number;
}
