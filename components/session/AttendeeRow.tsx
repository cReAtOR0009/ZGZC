import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';
import { Models } from 'appwrite';


export type Attendee = Models.Document & {
  fullName: string;
  email: string;
  accredited: boolean;
};

type Props = { attendee: Attendee };

export const AttendeeRow = ({ attendee }: Props) => (
  <View style={styles.row} accessible accessibilityLabel={`Attendee ${attendee.fullName}`}>
    <Text style={styles.name}>{attendee.fullName}</Text>
    {attendee.accredited && <Text style={styles.badge}>✅</Text>}
  </View>
);

const styles = StyleSheet.create({
  row: {
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  badge: {
    fontSize: theme.fontSize.md,
    color: theme.colors.success,
  },
});
