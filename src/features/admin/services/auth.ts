import { create } from 'zustand';
import { supabase } from '../../../services/supabase';

interface AdminAuthState {
  isAdmin: boolean;
  orgId: string | null;
  isLoading: boolean;
  checkAdminStatus: () => Promise<boolean>;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logoutAdmin: () => Promise<void>;
}

export const useAdminAuth = create<AdminAuthState>((set) => ({
  isAdmin: false,
  orgId: null,
  isLoading: true,

  checkAdminStatus: async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        set({ isAdmin: false, orgId: null, isLoading: false });
        return false;
      }

      const role = user.app_metadata?.role;
      const orgId = user.app_metadata?.org_id;

      const isAdmin = role === 'admin';
      set({ isAdmin, orgId, isLoading: false });

      return isAdmin;
    } catch {
      set({ isAdmin: false, orgId: null, isLoading: false });
      return false;
    }
  },

  loginAdmin: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const role = data.user?.app_metadata?.role;
      const orgId = data.user?.app_metadata?.org_id;

      if (role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('Accès non autorisé');
      }

      set({ isAdmin: true, orgId, isLoading: false });
    } catch (error) {
      set({ isAdmin: false, orgId: null, isLoading: false });
      throw error;
    }
  },

  logoutAdmin: async () => {
    await supabase.auth.signOut();
    set({ isAdmin: false, orgId: null, isLoading: false });
  },
}));
