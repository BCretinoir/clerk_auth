import React from "react";
import { SafeAreaView, StyleSheet, ViewProps, View as RNView } from "react-native";
import { theme } from "../../theme";

interface ContainerProps extends ViewProps {
  safeArea?: boolean;
  children: React.ReactNode;
}

export function Container({
  safeArea = false,
  children,
  style,
  ...props
}: ContainerProps) {
  if (safeArea) {
    return (
      <SafeAreaView style={[styles.container, style]} {...props}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <RNView style={[styles.container, style]} {...props}>
      {children}
    </RNView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});