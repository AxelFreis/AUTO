import { create } from 'zustand';
import { User } from '../models/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const mockUser: User = {
        id: '1',
        email,
        role: email.includes('admin') ? 'admin' : 'client',
        created_at: new Date().toISOString(),
      };
      set({ user: mockUser, isAuthenticated: true });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    set({ user: null, isAuthenticated: false });
  },
}));
