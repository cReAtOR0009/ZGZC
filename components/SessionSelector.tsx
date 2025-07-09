import { useSessionStore } from "@/store/sessions";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { SessionList } from "./session/SessionList";

export default function SessionSelector() {
  const { sessions, fetchSessions, currentSession, setCurrentSession } =
    useSessionStore();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // console.log("sessions-------", sessions)

  useEffect(() => {
    fetchSessions();
  }, []);

  const handlePress = (item) => {
    setCurrentSession(item);
    // Add a small bounce animation on press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <SessionList
        sessions={sessions}
        currentSession={currentSession}
        onSelectSession={setCurrentSession}
        title="Select Current Session"
        icon="calendar-alt"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingLeft: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#011627",
    marginLeft: 12,
  },
  listContainer: {
    paddingBottom: 8,
    paddingHorizontal: 4,
  },
  sessionCard: {
    width: 160,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  activeCard: {
    backgroundColor: "#F8F9FA",
    borderWidth: 2,
    borderColor: "#2563eb",
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  sessionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#011627",
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sessionTime: {
    fontSize: 14,
    color: "#6C757D",
    marginLeft: 6,
  },
  activeIndicator: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
