import { useTheme } from "@/hooks/useTheme";
import { StyleSheet } from "react-native";

export const useThemeStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
    },
    scrollContainer: {
      padding: 24,
      paddingBottom: 40,
    },
    header: {
      marginBottom: 32,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.subtitleText,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      color: theme.inputLabel,
      marginBottom: 8,
      fontWeight: "500",
    },
    required: {
      color: "#dc2626",
    },
    inputWrapper: {
      position: "relative",
    },
    input: {
      borderWidth: 1,
      borderColor: theme.inputBorder,
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
      marginVertical: 12,
      fontSize: 14,
      fontWeight: "500",
      textAlign: "center",
    },
    button: {
      backgroundColor: theme.buttonBackground,
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
      color: theme.buttonText,
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
