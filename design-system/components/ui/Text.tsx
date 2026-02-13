import React from "react";
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from "react-native";
import { theme } from "../../theme";

type TextVariant = "h1" | "h2" | "h3" | "body" | "caption" | "label";
type TextWeight = "normal" | "medium" | "semiBold" | "bold";

interface CustomTextProps extends RNTextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: keyof typeof theme.colors;
  align?: "left" | "center" | "right";
  children?: React.ReactNode;
}

export function Text({
  variant = "body",
  weight = "normal",
  color = "textPrimary",
  align = "left",
  style,
  children,
  ...props
}: CustomTextProps) {
  return (
    <RNText
      style={[
        styles[variant],
        { fontWeight: theme.fontWeight[weight] },
        { color: theme.colors[color] },
        { textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
  },
  h2: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
  },
  h3: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semiBold,
  },
  body: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.normal,
  },
  caption: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.normal,
  },
  label: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semiBold,
  },
});