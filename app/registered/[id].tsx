import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { databases } from '@/config/appwriteConfig';
import { ATTENDEE_COLLECTION_ID, APPWRITE_DB_ID } from '@/config/appwriteConfig';

export default function AttendeeDetails() {
  const { id } = useLocalSearchParams();
  const [attendee, setAttendee] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchAttendee();
  }, [id]);

  const fetchAttendee = async () => {
    setLoading(true);
    try {
      const res = await databases.getDocument(APPWRITE_DB_ID, ATTENDEE_COLLECTION_ID, id as string);
      // console.log("res-------", res)
      setAttendee(res);
    } catch (e) {
      console.error('Failed to load attendee:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator className="mt-20" />;

  if (!attendee) return <Text className="text-center mt-10">Attendee not found</Text>;

  return (
    <ScrollView className="p-4">
      <Text className="text-xl font-bold mb-4">{attendee.fullName}</Text>

      <View className="mb-3">
        <Text className="font-semibold">📧 Email:</Text>
        <Text>{attendee.email || 'N/A'}</Text>
      </View>

      <View className="mb-3">
        <Text className="font-semibold">📱 Phone:</Text>
        <Text>{attendee.phone || attendee.phoneNumber || 'N/A'}</Text>
      </View>

      <View className="mb-3">
        <Text className="font-semibold">🏢 Group:</Text>
        <Text>{attendee.group || 'N/A'}</Text>
      </View>

      <View className="mb-3">
        <Text className="font-semibold">🌍 Chapter:</Text>
        <Text>{attendee.chapter || 'N/A'}</Text>
      </View>

      <View className="mb-3">
        <Text className="font-semibold">🏅 Designation:</Text>
        <Text>{attendee.designation || 'N/A'}</Text>
      </View>

      <View className="mb-3">
        <Text className="font-semibold">🆔 QR ID:</Text>
        <Text>{attendee.qrId}</Text>
      </View>

      <View className="mb-3">
        <Text className="font-semibold">✅ Accreditation Status:</Text>
        <Text>{attendee.accredited ? 'Accredited ✅' : 'Not Accredited ❌'}</Text>
      </View>

      <View className="mt-6">
        <Text className="text-xs text-gray-500">
          Registered on: {new Date(attendee.registeredAt).toLocaleString()}
        </Text>
      </View>
    </ScrollView>
  );
}
