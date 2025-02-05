import { create } from 'zustand';
import { UserData } from '../types/portfolio';

interface AuthState {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  login: async (email, password) => {
    // Simulate API call
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));