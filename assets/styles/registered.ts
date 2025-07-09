import { useTheme } from "@/hooks/useTheme";
import { Platform, StyleSheet } from "react-native";

export const useThemeStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === "ios" ? 60 : 40,
      paddingHorizontal: 16,
      marginBottom:50
    },
    header: {
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "bold",
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(118, 118, 128, 0.12)",
      borderRadius: 10,
      paddingHorizontal: 12,
      marginBottom: 16,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 44,
      fontSize: 16,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderRadius: 12,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    avatarContainer: {
      marginRight: 16,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    avatarPlaceholder: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    avatarText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
    },
    infoContainer: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 2,
    },
    company: {
      fontSize: 14,
      opacity: 0.8,
      marginBottom: 4,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 2,
    },
    details: {
      fontSize: 13,
      opacity: 0.7,
      marginLeft: 4,
    },
    icon: {
      marginRight: 4,
    },
    chevron: {
      opacity: 0.5,
    },
  });
};
