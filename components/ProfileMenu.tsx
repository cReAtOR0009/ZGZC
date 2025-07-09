import { useAuth } from "@/store/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface User {
  name?: string;
  email?: string;
  avatarIcon?: string;
}

interface MenuItem {
  icon: string;
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
}

const ProfileMenu = () => {
  // Component state
  const [visible, setVisible] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get("window").width;
  const { user, logout, getCurrent } = useAuth();

  // Default user data (can be customized via props later)
  //   const [user, setUser] = useState<User>({
  //     name: 'Guest User',
  //     email: 'guest@example.com',
  //     avatarIcon: 'user-circle'
  //   });

  // Default menu items (can be customized via props later)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      icon: "cog",
      label: "Settings",
      onPress: () => console.log("Settings pressed"),
      isDestructive: false,
    },
    {
      icon: "info-circle",
      label: "About",
      onPress: () => console.log("About pressed"),
      isDestructive: false,
    },
    {
      icon: "sign-out-alt",
      label: "Log Out",
      onPress: () => logout(),
      isDestructive: true,
    },
  ]);

  const toggleMenu = () => {
    Animated.timing(animation, {
      toValue: visible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (visible) {
        setVisible(false);
      }
    });

    if (!visible) {
      setVisible(true);
    }
  };

  const handleItemPress = (action: () => void) => {
    action();
    toggleMenu();
  };

  const menuTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  const menuOpacity = animation;

  return (
    <View style={styles.container}>
      {/* Profile Button */}
      <TouchableOpacity
        onPress={toggleMenu}
        style={styles.profileButton}
        accessibilityLabel="User profile menu"
        accessibilityRole="button"
        accessibilityState={{ expanded: visible }}
      >
        <FontAwesome5
          name={user?.avatarIcon || "user-circle"}
          size={28}
          color="#2563eb"
        />
      </TouchableOpacity>

      {/* Animated Menu */}
      {visible && (
        <Animated.View
          style={[
            styles.menu,
            {
              opacity: menuOpacity,
              transform: [{ translateY: menuTranslateY }],
              right: windowWidth > 400 ? 0 : -20,
              width: windowWidth > 400 ? 280 : windowWidth - 40,
            },
          ]}
          accessibilityViewIsModal={true}
        >
          {/* User Profile Section */}
          <View style={styles.profileSection}>
            <FontAwesome5
              name={user?.avatarIcon || "user-circle"}
              size={40}
              color="#2563eb"
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName} numberOfLines={1}>
                {user?.name || "User"}
              </Text>
              <Text style={styles.profileEmail} numberOfLines={1}>
                {user?.email}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <React.Fragment key={`${item.label}-${index}`}>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  item.isDestructive && styles.destructiveItem,
                ]}
                onPress={() => handleItemPress(item.onPress)}
                accessibilityLabel={item.label}
                accessibilityRole="menuitem"
              >
                <FontAwesome5
                  name={item.icon}
                  size={18}
                  color={item.isDestructive ? "#e63946" : "#6C757D"}
                />
                <Text
                  style={[
                    styles.menuText,
                    item.isDestructive && styles.destructiveText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
              {index < menuItems.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1000,
  },
  profileButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "rgba(46, 196, 182, 0.1)",
  },
  menu: {
    position: "absolute",
    top: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#011627",
  },
  profileEmail: {
    fontSize: 14,
    color: "#6C757D",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    minHeight: 44,
  },
  menuText: {
    fontSize: 16,
    color: "#495057",
    marginLeft: 12,
  },
  destructiveItem: {
    // Additional styles for destructive actions
  },
  destructiveText: {
    color: "#e63946",
  },
});

export default ProfileMenu;
