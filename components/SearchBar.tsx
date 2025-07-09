import React from 'react';
import { TextInput, View } from 'react-native';

export default function SearchBar({ value, onChangeText, placeholder }: any) {
  return (
    <View className="bg-gray-200 rounded-full px-4 py-2 mb-4">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="text-base"
      />
    </View>
  );
}

