import { useRealtimeSessionAttendance } from "@/hooks/useRealtimeSessionAttendance";
import { useSessionStore } from "@/store/sessions";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function SessionStats() {
  useRealtimeSessionAttendance();
 const currentSession = useSessionStore.getState().currentSession;

  if (!currentSession) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="chart-bar" size={20} color="#2563eb" />
        <Text style={styles.title}>Session Statistics</Text>
      </View>

      <View style={styles.sessionInfo}>
        <Text style={styles.sessionName}>{currentSession?.name}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <FontAwesome5 name="users" size={18} color="#4361EE" />
          <Text style={styles.statValue}>
            {currentSession?.attendeeIds?.length ?? 0}
          </Text>
          <Text style={styles.statLabel}>Total Attendees</Text>
        </View>

        <View style={styles.statCard}>
          <FontAwesome5 name="check-circle" size={18} color="#4CC9F0" />
          <Text style={styles.statValue}>
            {currentSession?.checkedInCount ?? 0}
          </Text>
          <Text style={styles.statLabel}>Checked In</Text>
        </View>

        <View style={styles.statCard}>
          <FontAwesome5 name="clock" size={18} color="#FF9F1C" />
          <Text style={styles.statValue}>{currentSession?.time || "N/A"}</Text>
          <Text style={styles.statLabel}>Session Time</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#011627",
    marginLeft: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    // backgroundColor:"red",
    marginBottom: 30,
  },
  statCard: {
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 5,
    // flex:0,
    minWidth: 90,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#011627",
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6C757D",
    textAlign: "center",
  },
  sessionInfo: {
    marginBlock: 15,
  },
  sessionName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#011627",
    textAlign: "center",
  },
});
