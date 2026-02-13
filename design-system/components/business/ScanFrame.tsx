import React from "react";
import { StyleSheet, View as RNView } from "react-native";
import { View } from "../ui/View";
import { theme } from "../../theme";

export function ScanFrame() {
  return (
    <View flex={1} center>
      <RNView style={styles.frame} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
  },
});
