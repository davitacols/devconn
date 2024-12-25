import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  joinDate: string;
  role: 'user' | 'admin';
  skills: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  articles: number;
  followers: number;
  following: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
          }
          
          const user = await response.json();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false, isAuthenticated: false });
        }
      },

      register: async (email: string, password: string, username: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username }),
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Registration failed');
          }
          
          const user = await response.json();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false, isAuthenticated: false });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/auth/profile', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Profile update failed');
          }
          
          const updatedUser = await response.json();
          set({ user: updatedUser, isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      skipHydration: true,
    }
  )
);