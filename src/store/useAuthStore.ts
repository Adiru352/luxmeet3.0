import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // TODO: Implement actual authentication
    const mockUser: User = {
      id: '1',
      email,
      name: 'John Doe',
      role: 'user',
      businessCards: [],
      leads: [],
    };
    set({ user: mockUser, isAuthenticated: true });
  },
  register: async (data) => {
    // TODO: Implement actual registration
    const mockUser: User = {
      id: '1',
      email: data.email,
      name: data.name,
      role: 'user',
      businessCards: [],
      leads: [],
    };
    set({ user: mockUser, isAuthenticated: true });
  },
  loginWithGoogle: async () => {
    // TODO: Implement Google authentication
    const mockUser: User = {
      id: '1',
      email: 'john@gmail.com',
      name: 'John Doe',
      role: 'user',
      businessCards: [],
      leads: [],
    };
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));