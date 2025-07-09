import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function AttendeeCard({ attendee, onPress }: { attendee: any, onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} className="bg-gray-100 mb-3 p-4 rounded-xl">
      <Text className="text-lg font-semibold">{attendee.fullName}</Text>
      <Text className="text-sm text-gray-500">{attendee.email}</Text>
      <Text className="text-sm text-gray-500">{attendee.phone}</Text>
    </TouchableOpacity>
  );
}
