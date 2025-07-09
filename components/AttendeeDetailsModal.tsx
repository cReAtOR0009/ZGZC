import {
  APPWRITE_DB_ID,
  databases,
  SESSION_COLLECTION_ID,
} from "@/config/appwriteConfig";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AttendeeDetailsModal = ({ attendee, onClose }) => {
  const { colors } = useTheme();
  const [sessionsAttended, setSessionsAttended] = useState([]);

useEffect(() => {
  if (!attendee?.$id) return;

  const fetchSessions = async () => {
    try {
      const result = await databases.listDocuments(
        APPWRITE_DB_ID,
        SESSION_COLLECTION_ID
      );

      // Filter sessions that include the attendee in their attendeeIds
      const attended = result.documents.filter((session) =>
        session.attendeeIds?.some((a) => a?.$id === attendee.$id)
      );

      setSessionsAttended(attended);
    } catch (error) {
      console.error("Failed to fetch sessions attended:", error);
    }
  };

  fetchSessions();
}, [attendee?.$id]);


  return (
    <View
      style={[styles.modalContainer, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Attendee Details
        </Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          {attendee?.photoUrl ? (
            <Image
              source={{ uri: attendee.photoUrl }}
              style={styles.profileImage}
            />
          ) : (
            <View
              style={[
                styles.profilePlaceholder,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={styles.profileInitial}>
                {attendee?.fullName?.charAt(0)?.toUpperCase() || "A"}
              </Text>
            </View>
          )}
          <Text style={[styles.name, { color: colors.text }]}>
            {attendee?.fullName}
          </Text>
          {attendee?.designation && (
            <Text style={[styles.designation, { color: colors.text }]}>
              {attendee?.designation}
            </Text>
          )}
        </View>

        {/* Details Section */}
        <View
          style={[styles.detailsContainer, { backgroundColor: colors.card }]}
        >
          <DetailRow
            icon="mail-outline"
            label="Email"
            value={attendee?.email}
            colors={colors}
          />
          <DetailRow
            icon="call-outline"
            label="Phone"
            value={attendee?.phone || attendee?.phoneNumber}
            colors={colors}
          />
          <DetailRow
            icon="people-outline"
            label="Group"
            value={attendee?.group}
            colors={colors}
          />
          <DetailRow
            icon="location-outline"
            label="Chapter"
            value={attendee?.chapter}
            colors={colors}
          />
          <DetailRow
            icon="id-card-outline"
            label="QR ID"
            value={attendee?.qrId}
            colors={colors}
          />
          <DetailRow
            icon="checkmark-circle-outline"
            label="Status"
            value={attendee?.accredited ? "Accredited" : "Not Accredited"}
            colors={colors}
            isAccredited={attendee?.accredited}
          />

          <Text style={{ fontWeight: "bold", marginTop: 16 }}>
            Sessions Attended:
          </Text>
          {sessionsAttended.length === 0 ? (
            <Text>No sessions recorded.</Text>
          ) : (
            sessionsAttended.map((session) => (
              <Text key={session.$id}>• {session.name}</Text>
            ))
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.registeredText, { color: colors.text }]}>
            Registered on: {new Date(attendee?.registeredAt).toLocaleString()}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const DetailRow = ({ icon, label, value, colors, isAccredited = false }) => {
  if (!value) return null;

  return (
    <View style={styles.detailRow}>
      <Ionicons
        name={icon}
        size={20}
        color={isAccredited ? "#4CAF50" : colors.text}
        style={styles.detailIcon}
      />
      <View style={styles.detailTextContainer}>
        <Text style={[styles.detailLabel, { color: colors.text }]}>
          {label}
        </Text>
        <Text
          style={[
            styles.detailValue,
            { color: isAccredited ? "#4CAF50" : colors.text },
            isAccredited && { fontWeight: "bold" },
          ]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    // paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  headerRight: {
    width: 24,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 25,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profilePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  profileInitial: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  designation: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 3,
  },
  detailsContainer: {
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  detailIcon: {
    marginRight: 15,
    opacity: 0.8,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    opacity: 0.6,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  registeredText: {
    fontSize: 12,
    opacity: 0.6,
  },
});

export default AttendeeDetailsModal;
