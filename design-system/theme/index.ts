
export const colors = {
  primary: "#007bff",
  primaryLight: "#d0f0c0",
  
  white: "#fff",
  black: "#000",
  gray50: "#f9f9f9",
  gray100: "#f2f2f2",
  gray200: "#eee",
  gray300: "#ddd",
  gray400: "#ccc",
  gray600: "#666",
  gray800: "#888",
  
  success: "#d0f0c0",
  error: "#ff4444",
  warning: "#ff9800",
  
  // Text
  textPrimary: "#000",
  textSecondary: "#666",
  textTertiary: "#888",
  textInverse: "#fff",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const borderRadius = {
  sm: 8,
  md: 10,
  lg: 12,
} as const;

export const fontSize = {
  xs: 12,
  sm: 13,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 24,
} as const;

export const fontWeight = {
  normal: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
} as const;

export const iconSize = {
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
} as const;

export const tabBarHeight = {
  base: 100,
  paddingBottomAndroid: 20,
  paddingBottomIOS: 10,
  paddingTop: 10,
} as const;

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
} as const;

export const theme = {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  iconSize,
  tabBarHeight,
  shadows,
} as const;

export type Theme = typeof theme;