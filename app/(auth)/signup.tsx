import {
  APPWRITE_DB_ID,
  IDGen as ID,
  USER_COLLECTION_ID,
  account,
  databases,
} from "@/config/appwriteConfig";
import { useTheme } from "@/hooks/useTheme";
import { useThemeStyles } from "@/assets/styles/signup";
import { useAuth } from "@/store/auth";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  group: string;
  designation: string;
};

export default function SignupScreen() {
  const router = useRouter();
  const { getCurrent } = useAuth();
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    group: "",
    designation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const theme = useTheme();
  const styles = useThemeStyles();

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Clear error when user types
  };

  const validateForm = (): boolean => {
    if (!form.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!form.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!form.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // 1. Create account
      const newUser = await account.create(
        ID.unique(),
        form.email,
        form.password,
        form.fullName
      );

      // 2. Create session
      await account.createEmailPasswordSession(form.email, form.password);

      // 3. Create user document
      await databases.createDocument(
        APPWRITE_DB_ID,
        USER_COLLECTION_ID,
        newUser.$id,
        {
          fullName: form.fullName,
          email: form.email,
          group: form.group,
          designation: form.designation,
          createdAt: new Date().toISOString(),
        }
      );

      // 4. Update auth state
      await getCurrent();

      Alert.alert(
        "Account Created",
        "Welcome! Your account has been successfully created.",
        [{ text: "Continue", onPress: () => router.replace("/(tabs)") }]
      );
    } catch (error: any) {
      console.error("[Signup Error]", error);
      setError(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderInputField = (field: keyof FormData) => {
    const isPassword = field === "password";
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={
            field === "fullName"
              ? "John Doe"
              : field === "email"
              ? "your@email.com"
              : `Enter your ${field}`
          }
          value={form[field]}
          onChangeText={(text) => handleChange(field, text)}
          keyboardType={field === "email" ? "email-address" : "default"}
          secureTextEntry={isPassword && secureTextEntry}
          autoCapitalize={field === "fullName" ? "words" : "none"}
          autoCorrect={false}
        />
        {isPassword && (
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
        )}
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: theme.background,
        paddingVertical: 24,
      }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={50}
    >
      {/* <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      > */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Accreditors</Text>
        </View>

        {Object.keys(form).map((field) => (
          <View style={styles.inputContainer} key={field}>
            <Text style={styles.label}>
              {field === "fullName"
                ? "Full Name"
                : field.charAt(0).toUpperCase() + field.slice(1)}
              {(field === "fullName" ||
                field === "email" ||
                field === "password") && (
                <Text style={styles.required}> *</Text>
              )}
            </Text>
            {renderInputField(field as keyof FormData)}
          </View>
        ))}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          disabled={loading}
          onPress={handleSignup}
          style={[styles.button, loading && styles.buttonDisabled]}
        >
          {loading ? (
            <ActivityIndicator color={theme.text} />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => router.replace("/signin")}>
            <Text style={styles.footerLink}> Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </KeyboardAwareScrollView>
  );
}
