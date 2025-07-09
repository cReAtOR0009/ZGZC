import { dbService } from "@/api/dbService";
import { useThemeStyles } from "@/assets/styles/register";
import { ATTENDEE_COLLECTION_ID, IDGen } from "@/config/appwriteConfig";
import { chapters, designations, groups } from "@/constants/text";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  group: string;
  chapter: string;
  designation: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    group: "",
    chapter: "",
    designation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const styles = useThemeStyles()

  const handleChange = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
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
    if (!form.phoneNumber.trim()) {
      setError("Phone number is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const qrId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      await dbService.createDocument(
        ATTENDEE_COLLECTION_ID,
        {
          ...form,
          qrId,
          accredited: false,
          registeredAt: new Date().toISOString(),
        },
        IDGen.unique()
      );

      setSuccess("Attendee registered successfully!");
      setTimeout(() => {
        setForm({
          fullName: "",
          email: "",
          phoneNumber: "",
          group: "",
          chapter: "",
          designation: "",
        });
        router.navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderInputField = (field: keyof FormData) => {
    if (field === "group" || field === "chapter") {
      return (
        <Picker
          selectedValue={form[field]}
          onValueChange={(value) => handleChange(field, value)}
          style={styles.picker}
        >
          <Picker.Item label={`Select ${field}`} value="" />
          {(field === "group" ? groups : chapters).map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      );
    }

    if (field === "designation") {
      return (
        <Picker
          selectedValue={form.designation}
          onValueChange={(value) => handleChange("designation", value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Designation" value="" />
          {designations.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      );
    }

    return (
      <TextInput
        style={styles.input}
        placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
        value={form[field]}
        onChangeText={(text) => {
          const cleanedText =
            field === "phoneNumber" ? text.replace(/[^0-9]/g, "") : text;
          handleChange(field, cleanedText);
        }}
        keyboardType={
          field === "phoneNumber"
            ? "phone-pad"
            : field === "email"
            ? "email-address"
            : "default"
        }
        maxLength={field === "phoneNumber" ? 15 : undefined}
        autoCapitalize={field === "email" ? "none" : "words"}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Register New Attendee</Text>

          {Object.keys(form).map((field) => (
            <View style={styles.inputContainer} key={field}>
              <Text style={styles.label}>
                {field.replace(/([A-Z])/g, " $1")}
               
                  <Text style={styles.required}> *</Text>
              
              </Text>
              {renderInputField(field as keyof FormData)}
            </View>
          ))}

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : success ? (
            <Text style={styles.successText}>{success}</Text>
          ) : null}

          <TouchableOpacity
            disabled={loading}
            onPress={handleSubmit}
            style={[styles.submitButton, loading && styles.disabledButton]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Register Attendee</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

