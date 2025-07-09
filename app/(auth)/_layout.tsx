import { ActivityIndicator, View, StyleSheet } from "react-native";
import SafeScreen from "@/components/SafeScreen";
import { useAuth } from "@/store/auth";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/hooks/useTheme";

export default function AuthLayout() {
  const { user, isLoading } = useAuth();
  const theme = useTheme();

  // Show loading indicator while checking auth state
  if (isLoading) {
    return (
      <SafeScreen>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
        <StatusBar style="auto" />
      </SafeScreen>
    );
  }

  // Redirect authenticated users away from auth screens
  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeScreen>
      <StatusBar style="auto" />
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: theme.background }
      }}>
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
      </Stack>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});