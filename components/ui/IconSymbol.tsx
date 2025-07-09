// IconSymbol component remains the same
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle, View } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

const MAPPING = {
  'house.fill': 'home',
  'calendar-month': 'calendar-today',
  'person-add': 'person-add',
  'qr-code-scanner': 'qr-code-scanner',
  'people-alt': 'people-alt', 
  // Better alternative for "Attendees"
  // or other good options:
  // 'list': 'format-list-bulleted' 
  // 'list': 'list-alt'
  // 'list': 'assignment-ind'
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}