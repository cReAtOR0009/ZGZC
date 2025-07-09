import { StyleSheet, Platform } from "react-native";
import {theme} from "@/theme/theme"
import { useTheme } from "@/hooks/useTheme";

export const useThemeStyles =() =>{
  const theme = useTheme()
  return StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: theme.primary,
     justifyContent:"center",
    //  alignItems:"center"
   },
   cameraContainer: {
     flex: 1,
     backgroundColor: theme.primary,
     position: "relative",
   },
   camera: {
     flex: 1,
     width: "100%",
   },
   overlay: {
     flex: 1,
     padding: 24,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: theme.background,
   },
   warningText: {
     fontSize: 20,
     fontWeight: "bold",
     color: "red",
     marginBottom: 10,
   },
   subText: {
     color: "#555",
     textAlign: "center",
     marginBottom: 20,
     fontSize: 16,
   },
   backButton: {
     backgroundColor: theme.primary,
     paddingVertical: 12,
     paddingHorizontal: 20,
     borderRadius: 10,
   },
   backButtonText: {
     color: theme.buttonText,
     fontWeight: "600",
     fontSize: 16,
   },
   sessionBanner: {
     position: "absolute",
     top: Platform.OS === "ios" ? 60 : 100,
     left: 0,
     right: 0,
     backgroundColor: "rgba(0,0,0,0.7)",
     paddingVertical: 12,
     paddingHorizontal: 16,
     alignItems: "center",
     zIndex: 10,
   },
   sessionText: {
     color: "white",
     fontSize: 16,
     fontWeight: "500",
   },
   scannerFrame: {
     position: "absolute",
     top: "30%",
     left: "15%",
     width: "70%",
     height: "30%",
     borderWidth: 1,
     borderColor: "rgba(255, 255, 255, 0.3)",
     alignItems: "center",
     justifyContent: "center",
   },
   frameCornerTopLeft: {
     position: "absolute",
     top: 0,
     left: 0,
     width: 40,
     height: 40,
     borderLeftWidth: 4,
     borderTopWidth: 4,
     borderColor: theme.primary,
   },
   frameCornerTopRight: {
     position: "absolute",
     top: 0,
     right: 0,
     width: 40,
     height: 40,
     borderRightWidth: 4,
     borderTopWidth: 4,
     borderColor: theme.primary,
   },
   frameCornerBottomLeft: {
     position: "absolute",
     bottom: 0,
     left: 0,
     width: 40,
     height: 40,
     borderLeftWidth: 4,
     borderBottomWidth: 4,
     borderColor: theme.primary,
   },
   frameCornerBottomRight: {
     position: "absolute",
     bottom: 0,
     right: 0,
     width: 40,
     height: 40,
     borderRightWidth: 4,
     borderBottomWidth: 4,
     borderColor: theme.primary,
   },
   controlsContainer: {
     position: "absolute",
     bottom: 100,
     left: 0,
     right: 0,
     flexDirection: "row",
     justifyContent: "space-around",
     alignItems: "center",
     paddingHorizontal: 30,
   },
   controlButton: {
     backgroundColor: "rgba(0, 0, 0, 0.5)",
     width: 60,
     height: 60,
     borderRadius: 30,
     justifyContent: "center",
     alignItems: "center",
   },
   instructionsContainer: {
     position: "absolute",
     top: "65%",
     left: 0,
     right: 0,
     alignItems: "center",
   },
   instructionsText: {
     color: "white",
     fontSize: 16,
     fontWeight: "500",
     textAlign: "center",
     backgroundColor: "rgba(0,0,0,0.5)",
     paddingHorizontal: 20,
     paddingVertical: 10,
     borderRadius: 20,
   },
   permissionContainer: {
     flex: 1,
     alignItems: "center",
     justifyContent: "center",
     backgroundColor: "white",
     paddingHorizontal: 16,
   },
   permissionText: {
     color: "#4b5563",
     fontSize: 18,
     marginBottom: 20,
     textAlign: "center",
   },
   permissionButton: {
     backgroundColor: theme.primary,
     paddingVertical: 12,
     paddingHorizontal: 24,
     borderRadius: 8,
   },
   permissionButtonText: {
     color: "white",
     fontSize: 16,
     fontWeight: "600",
   },
   notFoundContainer: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "#fff",
     padding: 24,
   },
   notFoundTitle: {
     fontSize: 24,
     fontWeight: "700",
     color: "#dc2626", // red-600
     marginTop: 16,
     marginBottom: 4,
   },
   notFoundSubtitle: {
     fontSize: 16,
     color: "#6b7280", // gray-500
     textAlign: "center",
     marginBottom: 20,
     paddingHorizontal: 10,
   },
   primaryButton: {
     flexDirection: "row",
     alignItems: "center",
     backgroundColor: theme.primary, // blue-600
     paddingVertical: 12,
     paddingHorizontal: 20,
     borderRadius: 8,
   },
   buttonText: {
     color: "#fff",
     fontSize: 16,
     fontWeight: "600",
     marginLeft: 8,
   },
   errorBox: {
     backgroundColor: theme.background, // red-50
     borderColor: "#fecaca", // red-200
     borderWidth: 1,
     borderRadius: 8,
     margin: 20,
     padding: 16,
     alignItems: "center",
   },
   errorText: {
     color: "#991b1b", // red-800
     fontSize: 16,
     marginBottom: 10,
     textAlign: "center",
   },
 });
}