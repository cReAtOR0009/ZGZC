import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";

// import { COLORS } from "@/constants/colors";

const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme()

  return (
    <View style={{ paddingTop: insets.top, flex: 1, justifyContent:"center", backgroundColor:theme.background }}>
      {children}
    </View>
  );
};

export default SafeScreen;