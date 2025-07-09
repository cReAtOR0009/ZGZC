import { useThemeStyles } from "@/assets/styles/scan";
import AttendeeDetailsModal from "@/components/AttendeeDetailsModal";
import SafeScreen from "@/components/SafeScreen";
import {
  APPWRITE_DB_ID,
  ATTENDEE_COLLECTION_ID,
  databases,
  SESSION_COLLECTION_ID,
} from "@/config/appwriteConfig";
import { useTheme } from "@/hooks/useTheme";
import { useScanQueue } from "@/store/scanQueue";
import { useSessionStore } from "@/store/sessions";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import { Query } from "appwrite";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScanScreen() {
 const currentSession = useSessionStore.getState().currentSession;
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [attendeeData, setAttendeeData] = useState<any>(null);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [cameraType, setCameraType] = useState<"back" | "front">("back");
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [attendeeNotFound, setAttendeeNotFound] = useState(false);
  const [cameraKey, setCameraKey] = useState(0);
  const styles = useThemeStyles();
  const theme = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  // Reset scanner when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setScanned(false);
      setAttendeeData(null);
      resetScanner();
    }, [])
  );

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  const handleBarcodeScanned = useCallback(
    async ({ data }: { data: string }) => {
      if (!currentSession) {
        Alert.alert(
          "No Session Selected",
          "Please select a session before scanning.",
          [{ text: "OK", onPress: () => router.replace("/") }]
        );
        return;
      }

      if (scanned || !data?.trim()) return;
      if (typeof data !== "string") {
        console.error("Invalid QR code data format");
        return;
      }

      setScanned(true);

      // Offline: Save scan to queue without querying Appwrite
      const netInfo = await NetInfo.fetch();
      if (!netInfo.isConnected) {
        useScanQueue.getState().addToQueue({
          qrId: data, // Use raw scanned QR id
          timestamp: Date.now(),
        });
        setScanError("Saved for sync – you're offline.");
        return;
      }
      try {
        // Online: Proceed with lookup and update
        const res = await databases.listDocuments(
          APPWRITE_DB_ID,
          ATTENDEE_COLLECTION_ID,
          [Query.equal("qrId", data)]
        );

        if (res.documents.length === 0) {
          setAttendeeNotFound(true);
          return;
        }

        const attendeeDoc = res.documents[0];

        const alreadyInSession =
          currentSession.attendeeIds?.includes(attendeeDoc.$id) ?? false;

        if (!attendeeDoc.accredited) {
          await databases.updateDocument(
            APPWRITE_DB_ID,
            ATTENDEE_COLLECTION_ID,
            attendeeDoc.$id,
            { accredited: true }
          );
        }

        if (!alreadyInSession) {
          await databases.updateDocument(
            APPWRITE_DB_ID,
            SESSION_COLLECTION_ID,
            currentSession.$id,
            {
              attendeeIds: [
                ...(currentSession.attendeeIds || []),
                attendeeDoc.$id,
              ],
            }
          );
        }

        setAttendeeData({ ...attendeeDoc, accredited: true });
        setModalVisible(true);
      } catch (error) {
        console.error("Scan fetch error:", error);
        Alert.alert("Error", "Something went wrong while processing scan.");
      } finally {
        setScanned(false);
      }
    },
    [currentSession, scanned, router]
  );

  const toggleFlashlight = () => {
    setFlashlightOn(!flashlightOn);
  };

  const switchCamera = () => {
    setCameraType((current) => (current === "back" ? "front" : "back"));
  };

  const resetScanner = () => {
    setScanned(false);
    setAttendeeData(null);
    setAttendeeNotFound(false);
    setScanError(null);
    setCameraKey((prev) => prev + 1);
  };

  const closeModal = () => {
    setModalVisible(false);
    resetScanner();
  };

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Requesting camera permission...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (attendeeNotFound) {
    // {attendeeNotFound && (
    return (
      <Animated.View style={[styles.notFoundContainer, { opacity: fadeAnim }]}>
        <Ionicons name="alert-circle" size={60} color="#dc2626" />
        <Text style={styles.notFoundTitle}>Attendee Not Found</Text>
        <Text style={styles.notFoundSubtitle}>
          The scanned QR code doesn't match any registered attendee
        </Text>
        <TouchableOpacity onPress={resetScanner} style={styles.primaryButton}>
          <MaterialIcons name="qr-code-scanner" size={20} color="white" />
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      </Animated.View>
    );
    // )}
  }

  if (scanError) {
    //  {scanError && (
    return (
      <View style={styles.container}>
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{scanError}</Text>
          <TouchableOpacity onPress={resetScanner} style={styles.primaryButton}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    // )}
  }

  return (
    <View style={styles.container}>
      {!currentSession ? (
        <View style={styles.overlay}>
          <Text style={styles.warningText}>❌ No session selected</Text>
          <Text style={styles.subText}>
            You need to select a session before scanning attendees.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.backButtonText}>Go Select Session</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.cameraContainer}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={cameraType}
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
              onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
              enableTorch={flashlightOn}
            />

            {/* Scanner frame overlay */}
            <View style={styles.scannerFrame}>
              <View style={styles.frameCornerTopLeft} />
              <View style={styles.frameCornerTopRight} />
              <View style={styles.frameCornerBottomLeft} />
              <View style={styles.frameCornerBottomRight} />
            </View>

            {/* Current session banner */}
            <View style={styles.sessionBanner}>
              <Text style={styles.sessionText}>
                Scanning for: {currentSession.name}
              </Text>
            </View>

            {/* Controls container */}
            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={toggleFlashlight}
              >
                <Ionicons
                  name={flashlightOn ? "flashlight" : "flashlight-outline"}
                  size={32}
                  color={theme.primary}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={resetScanner}
              >
                <MaterialIcons name="refresh" size={32} color={theme.primary} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={switchCamera}
              >
                <Ionicons
                  name="camera-reverse-outline"
                  size={32}
                  color={theme.primary}
                />
              </TouchableOpacity>
            </View>

            {/* Instructions */}
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsText}>
                Point your camera at a QR code to scan
              </Text>
            </View>
          </View>
        </>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={closeModal}
      >
        <AttendeeDetailsModal
          attendee={attendeeData}
          // visible={modalVisible}
          onClose={closeModal}
        />
      </Modal>
    </View>
  );
}
