// import { styles } from "@/assets/styles/signin";
import { useThemeStyles } from "@/assets/styles/signin";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/store/auth";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignInScreen = () => {
  const router = useRouter();
  const { login, logout, getCurrent } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const theme = useTheme();
  const styles = useThemeStyles();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error when user types
  };

  const handleSignIn = async () => {
    // const user =await getCurrent()
    // console.log("user--------", user)
    //  router.replace("/(tabs)");
    // logout()
    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      // logout()
      await login(form.email, form.password);
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Error Signing in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: theme.background,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 40,
      }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={50}
      keyboardShouldPersistTaps="handled"
    >
      {/* <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      > */}
      {/* <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      > */}
      <View>
        <Image
          source={require("../../assets/images/sign_in.png")}
          style={{
            width: 300,
            height: 300,
            resizeMode: "cover", // Instead of resizeMethod
          }}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={form.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={form.password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={secureTextEntry}
            />
            <Pressable
              style={styles.eyeIcon}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            >
              <Feather
                name={secureTextEntry ? "eye-off" : "eye"}
                size={20}
                color="#64748b"
              />
            </Pressable>
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          disabled={loading}
          onPress={handleSignIn}
          style={[styles.button, loading && styles.buttonDisabled]}
        >
          {loading ? (
            <ActivityIndicator color={theme.background} />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable onPress={() => router.push("/signup")}>
            <Text style={styles.footerLink}> Sign Up</Text>
          </Pressable>
        </View>
      </View>
      {/* </ScrollView> */}
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;
