import React from "react";
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from "react-native";
import { theme } from "../../theme";
import { Text } from "./Text";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const textColor = variant === "primary" ? "textInverse" : "primary";
  
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      <Text
        weight="semiBold"
        color={textColor}
        style={styles.text}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  // Variants
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.gray100,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  // Sizes
  sm: {
    padding: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  md: {
    padding: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  lg: {
    padding: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  // States
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: "100%",
  },
  text: {
    textAlign: "center",
  },
});