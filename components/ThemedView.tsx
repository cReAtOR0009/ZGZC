import { View, type ViewProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export type ThemedViewProps = ViewProps & {
  /**
   * Optional key from your theme colors
   * @default 'background'
   */
  colorName?: keyof ReturnType<typeof useTheme>;
};

export function ThemedView({
  style,
  colorName = 'background',
  ...otherProps
}: ThemedViewProps) {
  const theme = useTheme();
  const backgroundColor = theme[colorName];

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}