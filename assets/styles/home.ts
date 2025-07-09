import { useTheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const useThemeStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      zIndex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: 80,
      paddingTop: 10,
    },
    container: {
      flex: 1,
      paddingHorizontal: 15,
      // justifyContent: "space-between",
      gap: 20,
      backgroundColor: "#F8F9FA",
    },

    welcomeText: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.primary,
      marginRight: 12,
    },
    userCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      padding: 16,
      borderRadius: 12,
      marginBottom: 24,
      shadowColor: "#2563eb",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      borderLeftWidth: 4,
      borderLeftColor: "#2563eb",
    },
    loadingCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      padding: 16,
      borderRadius: 12,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    userInfo: {
      fontSize: 16,
      color: "#495057",
      marginLeft: 12,
    },
    userEmail: {
      fontWeight: "600",
      color: "#2563eb",
    },
    loadingText: {
      color: "#6C757D",
      marginLeft: 12,
    },
    card: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      padding: 10,
      marginBottom: 24,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 5,
      marginBottom: 10,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    profileMenu: {
      position: "absolute",
      top: 70,
      right: 20,
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      padding: 16,
      width: 280,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
      zIndex: 100,
    },

    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 16,
      marginBottom: 32,
    },
    button: {
      flex: 1,
      borderRadius: 14,
      overflow: "hidden",
      shadowColor: "#fff",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
    },
    buttonContent: {
      paddingVertical: 18,
      paddingHorizontal: 24,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
    },
    registerButton: {
      borderWidth: 1,
      borderColor: "#2563eb",
      // paddingVertical: 16,
      paddingHorizontal: 10,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
    },
    scanButton: {
      backgroundColor: "#2563eb",
    },
    secondaryButtonText: {
      color: "white",
      fontWeight: "600",
      fontSize: 18,
    },
    buttonText: {
      color: "#2563eb",
      fontWeight: "600",
      fontSize: 16,
    },
  });
};
