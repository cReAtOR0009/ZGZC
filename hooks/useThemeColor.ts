import { useColorScheme } from 'react-native';
import { Colors, ThemeName, Theme } from '@/constants/Colors';

export function useTheme(selectedTheme?: ThemeName): Theme {
  const systemTheme = useColorScheme() || 'light'; // Fallback to light if null
  
  // Use selectedTheme if provided, otherwise use system theme
  const themeName = selectedTheme || systemTheme;
  
  // Fallback to light theme if the selected theme doesn't exist
  return Colors[themeName in Colors ? themeName : 'light'];
}