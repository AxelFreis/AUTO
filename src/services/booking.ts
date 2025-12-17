import { create } from 'zustand';
import { supabase } from './supabase';
import type { UploadedFile } from './storage';

interface BookingState {
  photos: UploadedFile[];
  serviceType: 'interior' | 'exterior' | 'complete' | 'polishing';
  estimatedPrice: number;
  estimatedDuration: number;
  date: string;
  time: string;
  locationType: 'home' | 'work' | null;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };

  setPhotos: (photos: UploadedFile[]) => void;
  setService: (type: 'interior' | 'exterior' | 'complete' | 'polishing', price: number, duration: number) => void;
  setDateTime: (date: string, time: string) => void;
  setLocation: (type: 'home' | 'work', address: { street: string; city: string; postalCode: string }) => void;
  reset: () => void;
}

const initialState = {
  photos: [],
  serviceType: 'interior' as const,
  estimatedPrice: 0,
  estimatedDuration: 0,
  date: '',
  time: '',
  locationType: null,
  address: {
    street: '',
    city: '',
    postalCode: '',
  },
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,

  setPhotos: (photos) => set({ photos }),

  setService: (type, price, duration) =>
    set({
      serviceType: type,
      estimatedPrice: price,
      estimatedDuration: duration
    }),

  setDateTime: (date, time) => set({ date, time }),

  setLocation: (type, address) =>
    set({ locationType: type, address }),

  reset: () => set(initialState),
}));

export const createBooking = async (userId: string) => {
  const state = useBookingStore.getState();

  const orgId = import.meta.env.VITE_ORG_ID;

  if (!orgId) {
    throw new Error('Configuration manquante : Organization ID');
  }

  if (!state.date || !state.time || !state.locationType) {
    throw new Error('Informations de réservation incomplètes');
  }

  const { data: services, error: serviceError } = await supabase
    .from('services')
    .select('id')
    .eq('type', state.serviceType)
    .eq('org_id', orgId)
    .maybeSingle();

  if (serviceError) {
    throw new Error(`Erreur lors de la récupération du service: ${serviceError.message}`);
  }

  if (!services) {
    throw new Error('Service non trouvé pour ce type de prestation');
  }

  const formattedAddress = `${state.address.street}, ${state.address.postalCode} ${state.address.city}`;

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      org_id: orgId,
      user_id: userId,
      service_id: services.id,
      date: state.date,
      time: state.time,
      location_type: state.locationType,
      address: formattedAddress,
      status: 'pending',
      estimated_price: state.estimatedPrice,
      photos: state.photos.map(p => p.url),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Erreur lors de la création de la réservation: ${error.message}`);
  }

  return data;
};

export interface UserBooking {
  id: string;
  date: string;
  time: string;
  address: string;
  location_type: 'home' | 'work';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  estimated_price: number;
  photos: string[];
  created_at: string;
  service: {
    id: string;
    name: string;
    type: string;
  } | null;
}

export const getUserBookings = async (userId: string): Promise<UserBooking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      id,
      date,
      time,
      address,
      location_type,
      status,
      estimated_price,
      photos,
      created_at,
      service:services(id, name, type)
    `)
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .order('time', { ascending: false });

  if (error) {
    throw new Error(`Erreur lors de la récupération des réservations: ${error.message}`);
  }

  return data || [];
};
