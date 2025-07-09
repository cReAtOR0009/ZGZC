import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/store/auth";
import { useTheme } from "@/hooks/useTheme";
import SafeScreen from "@/components/SafeScreen";
import { StatusBar } from "expo-status-bar";

const tabScreens = [
  {
    name: "index",
    title: "Home",
    icon: "house.fill",
  },
  {
    name: "sessions",
    title: "Sessions",
    icon: "calendar-month",
  },
  {
    name: "scan",
    title: "",
    icon: "qr-code-scanner",
  },
  {
    name: "register",
    title: "Register",
    icon: "person-add",
  },
  {
    name: "registered/index",
    title: "Attendees",
    icon: "people-alt",
  },
];

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: Platform.OS === "ios" ? -3 : 0,
        },
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: colors.tabBarBackground,
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === "ios" ? 80 : 60,
          paddingBottom: Platform.OS === "ios" ? 20 : 8,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
            },
            android: {
              elevation: 8,
            },
          }),
        },
      }}
    >
      {tabScreens.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, focused }) => (
              <View style={[
                styles.iconContainer,
                name === 'scan' && styles.scanButtonContainer,
                focused && name !== 'scan' && {
                  backgroundColor: "transparent"
                }
              ]}>
                <View style={[
                  name === 'scan' && styles.scanButton,
                  name === 'scan' && { backgroundColor: colors.primary }
                ]}>
                  <IconSymbol 
                    name={icon} 
                    color={name === 'scan' ? 'white' : color} 
                    size={name === 'scan' ? 28 : 22} 
                  />
                </View>
              </View>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 22,
    padding:0,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? 0 : -4,
  },
  scanButtonContainer: {
    marginTop: -30, 
    marginBottom: Platform.OS === "ios" ? 10 : 0,
  },
  scanButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});