import { useTheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const useThemeStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 24,
      justifyContent: "center",
    },
    container: {
      flex: 1,
      // backgroundColor:"red",
      // alignItems:"center",
      // justifyContent: "center",
    },
    scrollContainer: {
      padding: 24,
      paddingBottom: 40,
    },
    header: {
      marginBottom: 40,
      marginTop: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.title,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: "#64748b",
    },
    formContainer: {
      flex: 1,
    },
    inputContainer: {
      marginBottom: 24,
    },
    label: {
      fontSize: 14,
      color: "#334155",
      marginBottom: 8,
      fontWeight: "500",
    },
    inputWrapper: {
      position: "relative",
    },
    input: {
      borderWidth: 1,
      borderColor: "#e2e8f0",
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      backgroundColor: "#f8fafc",
    },
    eyeIcon: {
      position: "absolute",
      right: 16,
      top: 14,
    },
    errorText: {
      color: "#dc2626",
      marginBottom: 16,
      fontSize: 14,
      fontWeight: "500",
      textAlign: "center",
    },
    button: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      height: 52,
      marginTop: 8,
    },
    buttonDisabled: {
      opacity: 0.7,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 24,
    },
    footerText: {
      color: "#64748b",
    },
    footerLink: {
      color: theme.primary,
      fontWeight: "600",
    },
  });
};
