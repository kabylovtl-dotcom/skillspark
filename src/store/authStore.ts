import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useSocketStore } from './socketStore';

export type UserRole = 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  classCode?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole, name: string, classCode?: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  registerWithServer: (user: User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, password: string, role: UserRole, name: string, classCode?: string) => {
        // Mock authentication - в реальном приложении здесь был бы API запрос
        if (email && password && role && name) {
          const user: User = {
            id: Date.now().toString(),
            email,
            name,
            role,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8B5CF6&color=fff`,
            classCode
          };
          
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },

      registerWithServer: async (user: User) => {
        try {
          // For now, just set user locally since socket might not be ready
          set({ user, isAuthenticated: true });
          return true;
        } catch (error) {
          console.error('Error registering with server:', error);
          return false;
        }
      }
    }),
    {
      name: 'deltayurt-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
);
