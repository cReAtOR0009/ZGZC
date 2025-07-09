import { useThemeStyles } from "@/assets/styles/registered";
import AttendeeDetailsModal from "@/components/AttendeeDetailsModal";
import {
  APPWRITE_DB_ID,
  ATTENDEE_COLLECTION_ID,
  databases,
} from "@/config/appwriteConfig";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { useTheme } from "@react-navigation/native";
import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
// import {styles} from "@/assets/styles/registered"
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisteredAttendeesPage() {
  const [attendees, setAttendees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const styles = useThemeStyles()
  const theme = useTheme()

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      else setRefreshing(true);

      const res = await databases.listDocuments(
        APPWRITE_DB_ID,
        ATTENDEE_COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );

      setAttendees(res.documents);
      setFiltered(res.documents);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (!text) {
      setFiltered(attendees);
    } else {
      const lower = text.toLowerCase();
      setFiltered(
        attendees.filter(
          (a) =>
            a.fullName?.toLowerCase().includes(lower) ||
            a.email?.toLowerCase().includes(lower) ||
            a.phoneNumber?.includes(lower) ||
            a.company?.toLowerCase().includes(lower)
        )
      );
    }
  };

  const openModal = (attendee) => {
    setSelectedAttendee(attendee);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: theme.card }]}
      onPress={() => openModal(item)}
    >
      <View style={styles.avatarContainer}>
        {item.photoUrl ? (
          <Image source={{ uri: item.photoUrl }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatarPlaceholder,
              { backgroundColor: theme.primary },
            ]}
          >
            <Text style={styles.avatarText}>
              {item.fullName?.charAt(0)?.toUpperCase() || "#"}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
          {item.fullName}
        </Text>
        {item.company && (
          <Text
            style={[styles.company, { color: theme.text }]}
            numberOfLines={1}
          >
            {item.company}
          </Text>
        )}
        <View style={styles.detailRow}>
          <Ionicons
            name="mail-outline"
            size={14}
            color={theme.text}
            style={styles.icon}
          />
          <Text
            style={[styles.details, { color: theme.text }]}
            numberOfLines={1}
          >
            {item.email}
          </Text>
        </View>
        {item.phoneNumber && (
          <View style={styles.detailRow}>
            <Ionicons
              name="call-outline"
              size={14}
              color={theme.text}
              style={styles.icon}
            />
            <Text
              style={[styles.details, { color: theme.text }]}
              numberOfLines={1}
            >
              {item.phoneNumber}
            </Text>
          </View>
        )}
      </View>
      <MaterialIcons
        name="chevron-right"
        size={24}
        color={theme.text}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Registered Attendees
        </Text>
      </View>

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
          onChangeText={handleSearch}
          style={[styles.searchInput, { color: theme.text }]}
          clearButtonMode="while-editing"
        />
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={theme.primary}
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.$id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={() => fetchAttendees(true)}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeModal}
      >
        <AttendeeDetailsModal
          attendee={selectedAttendee}
          onClose={closeModal}
        />
      </Modal>
    </View>
  );
}
