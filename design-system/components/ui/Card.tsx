import React from "react";
import { ViewProps, StyleSheet } from "react-native";
import { theme } from "../../theme";
import { View } from "./View";

interface CardProps extends ViewProps {
  variant?: "default" | "highlighted";
  children: React.ReactNode;
}

export function Card({
  variant = "default",
  children,
  style,
  ...props
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        variant === "highlighted" && styles.highlighted,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.gray100,
  },
  highlighted: {
    backgroundColor: theme.colors.primaryLight,
  },
});