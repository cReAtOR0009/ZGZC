import { useThemeStore } from '@/store/themeStore';
import { Colors } from '@/constants/Colors';
import { useMemo } from 'react';

export function useTheme() {
  const activeTheme = useThemeStore((state) => {
    return state.themeName === 'system' ? state.systemTheme : state.themeName;
  });
  
  return useMemo(() => Colors[activeTheme] || Colors.light, [activeTheme]);
}

export function useThemeActions() {
  const setTheme = useThemeStore((state) => state.setTheme);
  const resetToSystem = useThemeStore((state) => state.resetToSystem);
  const currentTheme = useThemeStore((state) => state.themeName);
  
  return useMemo(() => ({
    setTheme,
    resetToSystem,
    currentTheme,
    isSystemTheme: currentTheme === 'system',
  }), [setTheme, resetToSystem, currentTheme]);
}