import { useTheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const useThemeStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    fullContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      padding: 20,
      marginTop: 30,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    heading: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.primary || "#2563eb",
      // color:"#2563eb",
    },
    subHeading: {
      fontSize: 14,
      color: theme.muted || "#6b7280",
      marginTop: 10,
    },
    profileButton: {
      padding: 8,
    },
    sessionCarouselContainer: {
      marginBlock: 15,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 12,
    },
    sessionList: {
      marginBottom: 8,
    },
    sessionListContent: {
      paddingRight: 8,
    },
    searchFilterContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
    sortButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.primary,
      paddingHorizontal: 10,
      paddingVertical: 12,
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: 10,
    },
    sortToggle: {
      color: "white",
      fontWeight: "600",
      fontSize: 14,
      marginLeft: 8,
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    statCard: {
      width: "48%",
      padding: 16,
      borderRadius: 12,
      alignItems: "center",
    },
    accreditedCard: {
      backgroundColor: "#EFF6FF",
    },
    offlineCard: {
      backgroundColor: "#FEF2F2",
    },
    statNumber: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      color: theme.muted || theme.primary,
    },
    listContainer: {
      flex: 1,
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: theme.card,
    },
    attendeeListContent: {
      paddingBottom: 20,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255,255,255,0.9)",
      zIndex: 1,
    },
    loadingText: {
      marginTop: 16,
      color: theme.text,
      fontSize: 16,
    },
    offlineNotice: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.notification || theme.primary,
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
      gap: 8,
    },
    offlineText: {
      color: "white",
      fontWeight: "600",
    },
    // syncButton: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   backgroundColor: theme.primary,
    //   paddingVertical: 10,
    //   marginHorizontal: 16,
    //   marginBottom: 30,
    //   borderRadius: 8,
    //   gap: 8,
    // },

    syncText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 14,
    },
    syncButton: {
      backgroundColor: theme.buttonBackground,
      padding: 12,
      margin: 16,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    syncText: {
      color: theme.buttonText,
      fontWeight: "bold",
      marginLeft: 8,
    },
    modalContainer: {
      flex: 1,
      padding: 24,
      backgroundColor: theme.background,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 16,
    },
    queueItem: {
      padding: 12,
      borderBottomColor: "#ddd",
      borderBottomWidth: 1,
    },
    qrText: {
      fontSize: 16,
      fontWeight: "500",
    },
    timeText: {
      fontSize: 14,
      color: "#666",
    },
    emptyText: {
      marginTop: 20,
      textAlign: "center",
      color: "#999",
    },
    syncNowButton: {
      backgroundColor: theme.buttonBackground,
      padding: 14,
      marginTop: 24,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    syncNowText: {
      color: theme.buttonText,
      fontWeight: "bold",
      marginLeft: 8,
    },
    closeText: {
      marginTop: 20,
      color: theme.primary,
      textAlign: "center",
      fontSize: 16,
    },
  });
};
