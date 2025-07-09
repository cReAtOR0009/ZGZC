import { FontAwesome5 } from "@expo/vector-icons";
import React, { useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SessionCardProps = {
  session: any;
  isActive: boolean;
  onSelect: () => void;
  disabled?: boolean;
  showAttendeeCount?: boolean;
};

export const SessionCard = ({
  session,
  isActive,
  onSelect,
  disabled = false,
  showAttendeeCount = true,
}: SessionCardProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const attendeeCount = session.attendeeIds?.length || 0;

  const handlePress = () => {
    onSelect();
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
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={disabled ? 1 : 0.8}
      disabled={disabled}
      accessibilityLabel={`${session.name}${
        showAttendeeCount ? `, ${attendeeCount} attendees` : ""
      }`}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive, disabled }}
      style={[
        styles.card,
        isActive && styles.activeCard,
        disabled && styles.disabledCard,
      ]}
    >
      <Animated.View
        style={{ transform: [{ scale: isActive ? scaleAnim : 1 }] }}
      >
        <Text style={styles.name}>{session.name}</Text>

        {showAttendeeCount && (
          <View style={styles.infoRow}>
            <FontAwesome5 name="users" size={12} color="#6C757D" />
            <Text style={styles.infoText}>
              {attendeeCount} {attendeeCount === 1 ? "attendee" : "attendees"}
            </Text>
          </View>
        )}

        {session.time && (
          <View style={styles.infoRow}>
            <FontAwesome5 name="clock" size={12} color="#6C757D" />
            <Text style={styles.infoText}>{session.time}</Text>
          </View>
        )}

        {isActive && !disabled && (
          <View style={styles.activeIndicator}>
            <FontAwesome5 name="check-circle" size={16} color="#2563eb" />
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  disabledCard: {
    backgroundColor: "#F1F5F9",
    borderColor: "#E5E7EB",
    opacity: 0.7,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#011627",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoText: {
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
