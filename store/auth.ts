import { account } from '@/config/appwriteConfig';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Models } from 'appwrite';

type User = Models.User<Models.Preferences> | null;

type AuthState = {
  user: User;
  isLoading: boolean;
  error: string | null;
  // rehydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getCurrent: () => Promise<void>;
};

const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useAuth = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      // rehydrated: false,
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          await account.createEmailPasswordSession(email, password);
          const user = await account.get();
          set({ user, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false 
          });
          throw error;
        }
      },
      logout: async () => {
        set({ isLoading: true });
        try {
          await account.deleteSession('current');
          set({ user: null, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Logout failed',
            isLoading: false 
          });
        }
      },
      getCurrent: async () => {
        set({ isLoading: true });
        try {
          const user = await account.get();

          // console.log("user-----", user)
          set({ user, isLoading: false });
        } catch {
          set({ user: null, isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => secureStorage), // Fix: Wraps SecureStore with JSON handling
      
    }
  )
);