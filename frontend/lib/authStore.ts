import { create } from 'zustand';
import Cookies from 'js-cookie';
import { authAPI } from './api';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'team';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: Cookies.get('token') || null,
  isLoading: false,
  isAuthenticated: !!Cookies.get('token'),

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await authAPI.login({ email, password });
      Cookies.set('token', data.token, { expires: 7 });
      set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  signup: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await authAPI.signup({ name, email, password });
      Cookies.set('token', data.token, { expires: 7 });
      set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: () => {
    Cookies.remove('token');
    set({ user: null, token: null, isAuthenticated: false });
    window.location.href = '/';
  },

  loadUser: async () => {
    if (!get().token) return;
    try {
      const { data } = await authAPI.me();
      set({ user: data.user, isAuthenticated: true });
    } catch {
      Cookies.remove('token');
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));
