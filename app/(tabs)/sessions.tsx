import { AttendeeRow } from "@/components/session/AttendeeRow";
import { EmptyState } from "@/components/session/EmptyState";
import { SessionList } from "@/components/session/SessionList";
import {
  APPWRITE_DB_ID,
  ATTENDEE_COLLECTION_ID,
  databases,
} from "@/config/appwriteConfig";
import { useRealtimeSessionAttendance } from "@/hooks/useRealtimeSessionAttendance";
import { useScanQueue } from "@/store/scanQueue";
import { useSessionStore } from "@/store/sessions";
import NetInfo from "@react-native-community/netinfo";
// import {styles} from "@/assets/styles/sessions"
import { useThemeStyles } from "@/assets/styles/sessions";
import ProfileMenu from "@/components/ProfileMenu";
import { useTheme } from "@/hooks/useTheme";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Models } from "appwrite";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Type Definitions
type Attendee = Models.Document & {
  fullName: string;
  email: string;
  accredited: boolean;
};

type Session = Models.Document & {
  name: string;
  attendeeIds: string[];
};

export default function SessionPage() {
  //  State & Store Hooks
  const { sessions, currentSession, fetchSessions, setCurrentSession } =
    useSessionStore();
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const offlineQueue = useScanQueue((s) => s.queue);
  const theme = useTheme();
  const styles = useThemeStyles();
  const [queueModalVisible, setQueueModalVisible] = useState(false);
  const {queue, syncQueue} = useScanQueue();
  const [syncing, setSyncing] = useState(false);

  const handleSyncScans = useCallback(async () => {
    try {
      setSyncing(true);

      if (!currentSession || !currentSession.$id) {
        Alert.alert("No Session", "Please select a session before syncing.");
        return;
      }

      await syncQueu(currentSession);
    } catch (e) {
      console.error("Failed to sync scans:", e);
      Alert.alert("Sync Failed", "Some scans couldn't be synced.");
    } finally {
      setSyncing(false);
    }
  }, [syncQueue, currentSession]);

  // 🚀 Realtime Updates
  useRealtimeSessionAttendance();

  // 📥 Initial Data Fetch
  useEffect(() => {
    fetchSessions().catch((err) =>
      console.error("Failed to fetch sessions:", err)
    );
  }, [fetchSessions, currentSession]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && offlineQueue.length > 0 && currentSession?.$id) {
        syncQueue(currentSession).catch((e) =>
          console.warn("Auto-sync failed:", e.message)
        );
      }
    });

    return () => unsubscribe();
  }, [queue.length, currentSession, syncQueue]);

  // 💾 Load Attendees Function
  const loadAttendees = useCallback(async () => {
    if (!currentSession?.attendeeIds?.length) return;

    setLoading(true);
    try {
      const data = await Promise.all(
        currentSession.attendeeIds.map((id) =>
          databases.getDocument<Attendee>(
            APPWRITE_DB_ID,
            ATTENDEE_COLLECTION_ID,
            id
          )
        )
      );
      setAttendees(data.filter(Boolean));
    } catch (err) {
      console.error("Attendee loading error:", err);
    } finally {
      setLoading(false);
    }
  }, [currentSession?.attendeeIds]);

  // 🔄 Reload when session changes
  useEffect(() => {
    loadAttendees();
  }, [loadAttendees]);

  // 🔍 Filtered & Sorted Attendees
  const filteredAttendees = useMemo(() => {
    const term = search.toLowerCase();
    return attendees
      .filter(
        (a) =>
          a.fullName.toLowerCase().includes(term) ||
          a.email.toLowerCase().includes(term)
      )
      .sort((a, b) =>
        sortAsc
          ? a.fullName.localeCompare(b.fullName)
          : b.fullName.localeCompare(a.fullName)
      );
  }, [attendees, search, sortAsc]);

  const renderAttendeeRow = useCallback(
    ({ item }: { item: Attendee }) => <AttendeeRow attendee={item} />,
    []
  );

  const emptyComponent = useMemo(() => {
    if (!currentSession) {
      return <EmptyState message="No session selected." />;
    }
    if (!search) {
      return <EmptyState message="No attendees found in this session." />;
    }
    return <EmptyState message="No results match your search." />;
  }, [currentSession, search]);

  // 📏 Session List Performance Optimization
  const getSessionItemLayout = useCallback(
    (data: any, index: number) => ({
      length: 150 + 8,
      offset: (150 + 8) * index,
      index,
    }),
    []
  );

  // 🔄 Refresh Control
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadAttendees();
    } finally {
      setRefreshing(false);
    }
  }, [loadAttendees]);

  // 🔄 Sort Toggle
  const toggleSort = useCallback(() => {
    setSortAsc((prev) => !prev);
  }, []);

  // return (
  return (
    <View style={styles.fullContainer}>
      <SafeAreaView style={styles.container}>
        {/* Enhanced Header with Profile Icon */}
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>
              Sessions
              {/* {currentSession
                ? ` ${currentSession.name}`
                : "No session selected"} */}
            </Text>
            {/* <Text style={styles.subHeading}>Manage your event attendees</Text> */}
          </View>
          <ProfileMenu />
        </View>

        {/* Session Carousel with Improved Styling */}
        <View style={styles.sessionCarouselContainer}>
          {/* <Text style={styles.sectionTitle}>Available Sessions</Text> */}
          <SessionList
            sessions={sessions}
            currentSession={currentSession}
            onSelectSession={setCurrentSession}
            horizontal={true}
            showsScrollIndicator={false}
            style={styles.sessionList}
            contentContainerStyle={styles.sessionListContent}
            getItemLayout={getSessionItemLayout}
            title="Available Sessions"
            icon="calendar-alt"
            showAttendeeCount={true}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={5}
          />
        </View>

        {/* Search and Filter Section */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search attendees..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            style={[styles.searchInput, { color: theme.text }]}
            clearButtonMode="while-editing"
          />
          <TouchableOpacity onPress={toggleSort} style={styles.sortButton}>
            <FontAwesome5
              name={sortAsc ? "sort-alpha-down" : "sort-alpha-up"}
              size={16}
              color="white"
            />
            <Text style={styles.sortToggle}>{sortAsc ? "A-Z" : "Z-A"}</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.accreditedCard]}>
            <Text style={styles.statNumber}>{filteredAttendees.length}</Text>
            <Text style={styles.statLabel}>Accredited</Text>
          </View>
          <TouchableOpacity
            // style={styles.syncButton}
            style={[styles.statCard, styles.offlineCard]}
            onPress={() => setQueueModalVisible(true)}
          >
            <Text style={styles.statNumber}>{queue.length}</Text>
            <Text style={styles.statLabel}>Sync Offline Queue</Text>
            {/* <View style={[styles.statCard, styles.offlineCard]}> */}
            <FontAwesome5 name="sync" size={16} color={theme.primary} />
            {/* <Text style={styles.statLabel}>Pending Sync</Text> */}
            {/* </View> */}
          </TouchableOpacity>
        </View>

        {/* Attendee List */}
        <View style={styles.listContainer}>
          {loading ? (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator color={theme.primary} size="large" />
              <Text style={styles.loadingText}>Loading attendees...</Text>
            </View>
          ) : (
            <FlatList
              data={filteredAttendees}
              keyExtractor={(item) => item.$id}
              renderItem={renderAttendeeRow}
              ListEmptyComponent={emptyComponent}
              ListFooterComponent={
                offlineQueue.length > 0 ? (
                  <TouchableOpacity
                    style={styles.syncButton}
                    onPress={handleSyncScans}
                    disabled={syncing}
                  >
                    {syncing ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <>
                        <FontAwesome5 name="sync" size={16} color="#fff" />
                        <Text style={styles.syncText}>
                          Sync {offlineQueue.length} scan
                          {offlineQueue.length > 1 ? "s" : ""}
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                ) : null
              }
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  colors={[theme.primary]}
                  tintColor={theme.primary}
                />
              }
              contentContainerStyle={styles.attendeeListContent}
              removeClippedSubviews
              maxToRenderPerBatch={20}
              windowSize={10}
              initialNumToRender={10}
            />
          )}
        </View>

        {/* Offline Notice */}
        {/* {offlineQueue.length > 0 && (
          <TouchableOpacity
            style={styles.syncButton}
            onPress={handleSyncScans}
            disabled={syncing}
          >
            {syncing ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <FontAwesome5 name="sync" size={16} color="#fff" />
                <Text style={styles.syncText}>
                  Sync {offlineQueue.length} scan
                  {offlineQueue.length > 1 ? "s" : ""}
                </Text>
              </>
            )}
          </TouchableOpacity>
        )} */}

        <Modal
          visible={queueModalVisible}
          animationType="slide"
          transparent={false}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Offline Scans</Text>
            <FlatList
              data={queue}
              keyExtractor={(item) => item.qrId}
              renderItem={({ item }) => (
                <View style={styles.queueItem}>
                  <Text style={styles.qrText}>QR: {item.qrId}</Text>
                  <Text style={styles.timeText}>
                    Time: {new Date(item.timestamp).toLocaleString()}
                  </Text>
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No pending offline scans.</Text>
              }
            />
      
            <TouchableOpacity
              style={[
                styles.syncNowButton,
                syncing && { opacity: 0.6 }, // disable look
              ]}
              disabled={syncing}
              onPress={async () => {
                try {
                  setSyncing(true);
                  await syncQueue(currentSession);
                  Alert.alert(
                    "Sync Complete",
                    "Offline scans have been synced."
                  );
                } catch (e) {
                  console.error("Manual sync failed:", e);
                  Alert.alert("Sync Failed", "Some scans could not be synced.");
                } finally {
                  setSyncing(false);
                }
              }}
            >
              <FontAwesome5 name="upload" size={16} color="white" />
              <Text style={styles.syncNowText}>
                {syncing ? "Syncing..." : "Sync Now"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setQueueModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}
