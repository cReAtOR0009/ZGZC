import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SessionCard } from "./SessionCard"; // We'll create this next

type SessionListProps = {
  sessions: any[];
  currentSession?: any;
  onSelectSession: (session: any) => void;
  title: string;
  icon?: string;
  showAttendeeCount?: boolean;
};

export const SessionList = ({
  sessions,
  currentSession,
  onSelectSession,
  title = "Sessions",
  icon = "calendar-alt",
  showAttendeeCount = true,
}: SessionListProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name={icon} size={20} color="#2563eb" />
        <Text style={styles.title}>{title}</Text>
      </View>

      <FlatList
        data={sessions}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <SessionCard
            session={item}
            isActive={currentSession?.$id === item.$id}
            onSelect={() => onSelectSession(item)}
            showAttendeeCount={showAttendeeCount}
          />
        )}
      />
    </View>
  );
};

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
});
