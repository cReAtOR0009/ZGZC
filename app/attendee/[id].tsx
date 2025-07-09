import { useScanQueue } from "@/store/scanQueue";
import { useSessionStore } from "@/store/sessions";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import { Query } from "appwrite";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  APPWRITE_DB_ID,
  ATTENDEE_COLLECTION_ID,
  databases,
  SESSION_COLLECTION_ID,
} from "@/config/appwriteConfig";

export default function AttendeePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const currentSession = useSessionStore.getState().currentSession;
  const [attendee, setAttendee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("");
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const fetchAndAccredit = async () => {
      setLoading(true);
      try {
        const res = await databases.listDocuments(
          APPWRITE_DB_ID,
          ATTENDEE_COLLECTION_ID,
          [Query.equal("qrId", id)]
        );

        if (res.documents.length === 0) {
          setAttendee(null);
          return;
        }

        const attendeeDoc = res.documents[0];
        setAttendee(attendeeDoc);

        const netInfo = await NetInfo.fetch();

        if (!netInfo.isConnected) {
          useScanQueue.getState().addToQueue({
            qrId: attendeeDoc.qrId,
            timestamp: Date.now(),
          });
          setStatus("Queued for sync when online");
          return;
        }

        if (!currentSession) {
          Alert.alert("No Session Selected", "Please select a session first.");
          return;
        }

        const alreadyInSession = currentSession.attendeeIds?.includes(attendeeDoc.$id) ?? false;

        if (!attendeeDoc.accredited) {
          await databases.updateDocument(
            APPWRITE_DB_ID,
            ATTENDEE_COLLECTION_ID,
            attendeeDoc.$id,
            { accredited: true }
          );
          setStatus("Successfully accredited");
        }

        if (!alreadyInSession) {
          await databases.updateDocument(
            APPWRITE_DB_ID,
            SESSION_COLLECTION_ID,
            currentSession.$id,
            {
              attendeeIds: [
                ...(currentSession.attendeeIds || []),
                attendeeDoc.$id,
              ],
            }
          );
          setStatus("Added to current session");
        }

        setAttendee({ ...attendeeDoc, accredited: true });
      } catch (e) {
        console.error("Accreditation Error:", e);
        setStatus("Error processing accreditation");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAndAccredit();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Verifying attendee...</Text>
      </View>
    );
  }

  if (!attendee) {
    return (
      <Animated.View style={[styles.notFoundContainer, { opacity: fadeAnim }]}>
        <Ionicons name="alert-circle" size={60} color="#dc2626" />
        <Text style={styles.notFoundTitle}>Attendee Not Found</Text>
        <Text style={styles.notFoundSubtitle}>
          The scanned QR code doesn't match any registered attendee
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/scan")}
          style={styles.primaryButton}
        >
          <MaterialIcons name="qr-code-scanner" size={20} color="white" />
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.header}>
          <Ionicons name="person-circle" size={80} color="#2563eb" />
          <Text style={styles.title}>{attendee.fullName}</Text>
          <Text style={styles.subtitle}>{attendee.designation}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <MaterialIcons name="email" size={24} color="#4b5563" />
            <Text style={styles.cardText}>{attendee.email}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.cardRow}>
            <MaterialIcons name="phone" size={24} color="#4b5563" />
            <Text style={styles.cardText}>{attendee.phone || 'Not provided'}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.cardRow}>
            <MaterialIcons name="groups" size={24} color="#4b5563" />
            <Text style={styles.cardText}>{attendee.group}</Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <View style={[
            styles.statusBadge,
            status.includes("Error") ? styles.errorBadge : styles.successBadge
          ]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Back to Scanner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/scan")}
            style={styles.primaryButton}
          >
            <MaterialIcons name="qr-code-scanner" size={20} color="white" />
            <Text style={styles.buttonText}>Scan Next</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#4b5563',
  },
  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  notFoundTitle: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
  },
  notFoundSubtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#334155',
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  statusContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  successBadge: {
    backgroundColor: '#dcfce7',
  },
  errorBadge: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  primaryButton: {
    // flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 8,
  },
  secondaryButton: {
    // flex: 1,
    borderWidth: 1,
    borderColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: 16,
  },
});