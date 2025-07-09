import AuthGate from "@/providers/AuthGate";
import { useScanQueue } from "@/store/scanQueue";
import NetInfo from "@react-native-community/netinfo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { LogBox } from "react-native";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useSessionStore } from "@/store/sessions";
import { View } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    //  "Axiforma-regular": require("../assets/fonts/Kastelov - Axiforma Regular.otf"),
  });

  LogBox.ignoreAllLogs();
  const insets = useSafeAreaInsets();
  const { currentSession } = useSessionStore();

  // hook is always called, even if fonts aren't loaded
  useEffect(() => {
    let isMounted = true;

    const handleSync = async () => {
      try {
        if (!currentSession?.$id) {
          console.warn("No valid session available for sync");
          return;
        }

        await useScanQueue.getState().syncQueue(currentSession);
      } catch (error) {
        console.error("Sync error:", error);
      }
    };

    // Initial sync attempt on mount
    NetInfo.fetch().then((state) => {
      if (isMounted && state.isConnected) {
        handleSync();
      }
    });

    // Subscribe to network changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (isMounted && state.isConnected) {
        handleSync();
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [currentSession?.$id]); // Only re-run if session ID changes

  if (!loaded) {
    return (
      <AuthGate>
        <StatusBar style="auto" />
        {/* Optional: Loading screen */}
        <Stack.Screen name="+loading" options={{ headerShown: false }} />
      </AuthGate>
    );
  }

  return (
    <AuthGate>
      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
          paddingTop: insets.top, // Avoids notch/status bar
          paddingBottom: insets.bottom, // Avoids bottom bar
        }}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </AuthGate>
  );
}
