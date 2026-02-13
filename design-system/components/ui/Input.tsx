import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { theme } from "../../theme";

interface InputProps extends TextInputProps {
  error?: boolean;
}

export function Input({ error, style, ...props }: InputProps) {
  return (
    <TextInput
      style={[styles.input, error && styles.error, style]}
      placeholderTextColor={theme.colors.gray600}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray400,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.white,
  },
  error: {
    borderColor: theme.colors.error,
  },
});