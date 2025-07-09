import { StyleSheet, Text, type TextProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

export type ThemedTextProps = TextProps & {
  /**
   * Text variant style
   * @default 'default'
   */
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  /**
   * Color name from theme
   * @default 'text'
   */
  colorName?: keyof ReturnType<typeof useTheme>;
};

export function ThemedText({
  style,
  type = 'default',
  colorName = 'text',
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();
  const textColor = theme[colorName];

  return (
    <Text
      style={[
        { color: textColor },
        styles[type],
        type === 'link' ? { color: theme.primary } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
});