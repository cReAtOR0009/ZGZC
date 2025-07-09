import { StyleSheet } from "react-native";
import { theme } from "@/theme/theme";
import { useTheme } from "@/hooks/useTheme";


export const useThemeStyles = () => {
  const theme = useTheme()
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
    },
    scrollContainer: {
      padding: 20,
      paddingBottom: 40,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      color: theme.primary,
      marginBottom: 15,
      textAlign: "left",
    },
    inputContainer: {
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      fontWeight: "500",
      color: "#334155",
    },
    required: {
      color: "#dc2626",
    },
    input: {
      borderWidth: 1,
      borderColor: theme.inputBorder,
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
      backgroundColor: "#f8fafc",
    },
    picker: {
      borderWidth: 1,
      borderColor: "#e2e8f0",
      borderRadius: 8,
      backgroundColor: "#f8fafc",
      // padding: 2,
    },
    errorText: {
      color: "#dc2626",
      marginVertical: 12,
      fontSize: 14,
      fontWeight: "500",
      textAlign: "center",
    },
    successText: {
      color: "#16a34a",
      marginVertical: 12,
      fontSize: 14,
      fontWeight: "500",
      textAlign: "center",
    },
    submitButton: {
      backgroundColor: theme.primary,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: "center",
      marginTop: 5,
      marginBottom: 50,
      elevation: 2,
    },
    disabledButton: {
      opacity: 0.7,
    },
    buttonText: {
      color: theme.buttonText,
      fontWeight: "600",
      fontSize: 16,
    },
  });
} 