export const APP_NAME = 'CarWash Pro';

export const QUERY_KEYS = {
  BOOKINGS: 'bookings',
  QUOTES: 'quotes',
  SERVICES: 'services',
  INVOICES: 'invoices',
  USER: 'user',
  ADMIN_DASHBOARD: 'admin_dashboard',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
} as const;

export const SERVICE_TYPES = {
  INTERIOR: 'interior',
  EXTERIOR: 'exterior',
  COMPLETE: 'complete',
  POLISHING: 'polishing',
} as const;

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;
