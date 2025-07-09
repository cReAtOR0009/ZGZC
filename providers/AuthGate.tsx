import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import SafeScreen from "@/components/SafeScreen";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/store/auth";
import { Slot, useRouter } from "expo-router";

export default function AuthGate() {
  const { user, getCurrent } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const theme  = useTheme();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrent();
      } catch (err) {
        console.log("Auth check failed:", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin"); // Redirect to signin if not authenticated
    }
  }, [user, loading]);

  if (loading) {
    return (
      <SafeScreen>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeScreen>
    );
  }

  return <Slot />;
}
