export type ThemeName =
  | "light"
  | "dark"
  | "minimal"
  | "highContrast"
  | "colorful"
  | "midnight";
export type ExtendedThemeName = ThemeName | "system";

export type Theme = typeof Colors.light;

const tintColorLight = "#2563eb";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: "#2563eb",
    title: "#2563eb",
    subtitleText: "#64748b", // Muted blue-gray
    inputBorder: "#e2e8f0", // Light gray border
    inputLabel: "#475569", // Darker gray for labels
    buttonBackground: "#2563eb", // Your primary blue
    buttonText: "#ffffff",
    tabBarBackground: "#ffffff",
    tabIconFocusedBackground: "rgba(10, 126, 164, 0.1)",
    tabBarBorder: "rgba(0, 0, 0, 0.05)",
    tabLabelActive: "#0a7ea4",
    tabLabelInactive: "#687076",
    card: "#f8f9fa",
    cardShadow: "rgba(0, 0, 0, 0.05)",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "#38bdf8",
    title: "#38bdf8",
    subtitleText: "#94a3b8", // Muted blue-gray
    inputBorder: "#334155", // Dark gray border
    inputLabel: "#e2e8f0", // Light gray for labels
    buttonBackground: "#38bdf8", // Your primary light blue
    buttonText: "#0f172a",
    tabBarBackground: "#1e1e1e",
    tabIconFocusedBackground: "rgba(255, 255, 255, 0.1)",
    tabBarBorder: "rgba(255, 255, 255, 0.05)",
    tabLabelActive: "#ffffff",
    tabLabelInactive: "#9BA1A6",
    card: "#252525",
    cardShadow: "rgba(0, 0, 0, 0.3)",
  },
  minimal: {
    text: "#1a1a1a",
    background: "#f9f9f9",
    tint: "#1a1a1a",
    icon: "#666666",
    tabIconDefault: "#aaaaaa",
    tabIconSelected: "#1a1a1a",
    primary: "#1a1a1a",
    title: "#1a1a1a",
    subtitleText: "#666666",
    inputBorder: "#e0e0e0",
    inputLabel: "#333333",
    buttonBackground: "#1a1a1a",
    buttonText: "#ffffff",
    tabBarBackground: "#ffffff",
    tabIconFocusedBackground: "rgba(0, 0, 0, 0.05)",
    tabBarBorder: "rgba(0, 0, 0, 0.08)",
    tabLabelActive: "#1a1a1a",
    tabLabelInactive: "#aaaaaa",
    card: "#ffffff",
    cardShadow: "rgba(0, 0, 0, 0.03)",
  },
  highContrast: {
    text: "#000000",
    background: "#ffffff",
    tint: "#0000ff",
    icon: "#333333",
    tabIconDefault: "#666666",
    tabIconSelected: "#0000ff",
    primary: "#0000ff",
    title: "#0000ff",
    subtitleText: "#000000", // Pure black for maximum contrast
    inputBorder: "#000000", // Black borders
    inputLabel: "#000000", // Black labels
    buttonBackground: "#0000ff", // Vivid blue
    buttonText: "#ffffff", // White text
    inputBackground: "#ffffff",
    tabBarBackground: "#ffffff",
    tabIconFocusedBackground: "rgba(0, 0, 255, 0.15)",
    tabBarBorder: "#cccccc",
    tabLabelActive: "#0000ff",
    tabLabelInactive: "#666666",
    card: "#ffffff",
    cardShadow: "rgba(0, 0, 0, 0.2)",
  },
  colorful: {
    text: "#2d3436",
    background: "#f5f6fa",
    tint: "#e84393",
    icon: "#636e72",
    tabIconDefault: "#b2bec3",
    tabIconSelected: "#e84393",
    primary: "#e84393",
    title: "#e84393",
    subtitleText: "#636e72", // Soft gray
    inputBorder: "#dfe6e9", // Very light gray
    inputLabel: "#2d3436", // Dark gray
    buttonBackground: "#e84393", // Vibrant pink (matches tint)
    buttonText: "#ffffff", // White text
    inputBackground: "#ffffff",
    tabBarBackground: "#ffffff",
    tabIconFocusedBackground: "rgba(232, 67, 147, 0.1)",
    tabBarBorder: "rgba(0, 0, 0, 0.05)",
    tabLabelActive: "#e84393",
    tabLabelInactive: "#b2bec3",
    card: "#ffffff",
    cardShadow: "rgba(0, 0, 0, 0.1)",
  },
  midnight: {
    text: "#f1f5f9",
    background: "#0f172a",
    tint: "#7dd3fc",
    icon: "#94a3b8",
    tabIconDefault: "#64748b",
    tabIconSelected: "#7dd3fc",
    primary: "#7dd3fc",
    title: "#7dd3fc",
    subtitleText: "#94a3b8", // Blue-gray
    inputBorder: "#334155", // Dark slate
    inputLabel: "#e2e8f0", // Light gray
    buttonBackground: "#7dd3fc", // Sky blue (matches tint)
    buttonText: "#0f172a", // Dark navy text
    inputBackground: "#1e293b",
    tabBarBackground: "#1e293b",
    tabIconFocusedBackground: "rgba(125, 211, 252, 0.1)",
    tabBarBorder: "rgba(255, 255, 255, 0.05)",
    tabLabelActive: "#7dd3fc",
    tabLabelInactive: "#64748b",
    card: "#1e293b",
    cardShadow: "rgba(0, 0, 0, 0.4)",
  },
} as const;
