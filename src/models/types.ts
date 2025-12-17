export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'client';
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  type: 'interior' | 'exterior' | 'complete' | 'polishing';
  duration: number;
  base_price: number;
  description?: string;
}

export interface Booking {
  id: string;
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
  created_at: string;
}

export interface Quote {
  id: string;
  user_id: string;
  service_type: string;
  photos: string[];
  estimated_price: number;
  estimated_duration: number;
  status: 'analyzing' | 'completed';
  created_at: string;
}

export interface Invoice {
  id: string;
  booking_id: string;
  user_id: string;
  amount: number;
  status: 'pending' | 'paid';
  issued_at: string;
  paid_at?: string;
}

export interface DashboardStats {
  bookings_count: number;
  revenue: number;
  pending_bookings: number;
  completed_today: number;
}
