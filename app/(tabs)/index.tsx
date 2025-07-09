import { useEffect, useRef } from "react";
import ProfileMenu from "@/components/ProfileMenu";
import SessionSelector from "@/components/SessionSelector";
import SessionStats from "@/components/SessionStats";
import { FontAwesome5 } from "@expo/vector-icons";
// import {styles} from "@/assets/styles/home"
import { useRouter } from "expo-router";
import {
  Animated,
  Easing,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyles } from "@/assets/styles/home";

export default function HomeScreen() {
  const router = useRouter();
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const styles = useThemeStyles()

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Fun Header with Animation */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.welcomeText}>Welcome Back! 👋</Text>
            </View>
            <ProfileMenu />
          </View>
          {/* Session Selector Card */}
          <View style={styles.card}>
            <SessionSelector />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>

            <TouchableOpacity
              onPress={() => router.push("/register")}
              style={[styles.button, styles.registerButton]}
            >
              <View style={styles.buttonContent}>
                <FontAwesome5 name="user-plus" size={24} color="#2563eb" />
                <Text style={styles.buttonText}>Register</Text>
              </View>
            </TouchableOpacity>
             <TouchableOpacity
              onPress={() => router.push("/scan")}
              style={[styles.button, styles.scanButton]}
            >
              <View style={styles.buttonContent}>
                <FontAwesome5 name="qrcode" size={24} color="white" />
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  Scan QR
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <SessionStats />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

