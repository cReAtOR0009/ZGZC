import { create } from 'zustand';
import { AppState, useColorScheme } from 'react-native';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, type ThemeName } from '@/constants/Colors';

type ThemeState = {
  themeName: ThemeName | 'system';
  systemTheme: 'light' | 'dark';
  setTheme: (theme: ThemeName | 'system') => void;
  resetToSystem: () => void;
  _hasHydrated: boolean;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      themeName: 'system',
      systemTheme: 'light',
      _hasHydrated: false,
      
      setTheme: (themeName) => {
        if (get().themeName !== themeName) {
          set({ themeName });
        }
      },
      
      resetToSystem: () => {
        if (get().themeName !== 'system') {
          set({ themeName: 'system' });
        }
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ themeName: state.themeName }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true;
          // Initialize system theme after hydration
          updateSystemTheme();
        }
      },
    }
  )
);

// System theme updater with guard against unnecessary updates
const updateSystemTheme = () => {
  const colorScheme = useColorScheme() || 'light';
  const currentState = useThemeStore.getState();
  
  if (currentState.systemTheme !== colorScheme) {
    useThemeStore.setState({
      systemTheme: colorScheme,
      themeName: currentState.themeName === 'system' ? colorScheme : currentState.themeName
    });
  }
};

// Setup listener after store hydration
let unsubscribe: (() => void) | null = null;

const setupListeners = () => {
  unsubscribe = AppState.addEventListener('change', updateSystemTheme).remove;
  updateSystemTheme();
};

// Only setup listeners after hydration
useThemeStore.persist.onFinishHydration(() => {
  setupListeners();
});

// Cleanup
export const cleanupThemeListener = () => {
  unsubscribe?.();
  unsubscribe = null;
};