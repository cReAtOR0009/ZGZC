import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const EmptyState = ({ message }: { message: string }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  text: {
    fontSize: theme.fontSize.md,
    color: theme.colors.muted,
  },
});
