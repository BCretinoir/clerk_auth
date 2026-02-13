import React from "react";
import { View as RNView, ViewProps as RNViewProps, ViewStyle } from "react-native";
import { theme } from "../../theme";

interface CustomViewProps extends RNViewProps {
  padding?: keyof typeof theme.spacing;
  paddingHorizontal?: keyof typeof theme.spacing;
  paddingVertical?: keyof typeof theme.spacing;
  margin?: keyof typeof theme.spacing;
  marginHorizontal?: keyof typeof theme.spacing;
  marginVertical?: keyof typeof theme.spacing;
  gap?: keyof typeof theme.spacing;
  flex?: number;
  row?: boolean;
  center?: boolean;
  centerVertical?: boolean;
  centerHorizontal?: boolean;
  backgroundColor?: keyof typeof theme.colors;
  children?: React.ReactNode;
}

export function View({
  padding,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginHorizontal,
  marginVertical,
  gap,
  flex,
  row,
  center,
  centerVertical,
  centerHorizontal,
  backgroundColor,
  style,
  children,
  ...props
}: CustomViewProps) {
  const dynamicStyle: ViewStyle = {};

  if (padding) dynamicStyle.padding = theme.spacing[padding];
  if (paddingHorizontal) dynamicStyle.paddingHorizontal = theme.spacing[paddingHorizontal];
  if (paddingVertical) dynamicStyle.paddingVertical = theme.spacing[paddingVertical];
  if (margin) dynamicStyle.margin = theme.spacing[margin];
  if (marginHorizontal) dynamicStyle.marginHorizontal = theme.spacing[marginHorizontal];
  if (marginVertical) dynamicStyle.marginVertical = theme.spacing[marginVertical];
  if (gap) dynamicStyle.gap = theme.spacing[gap];
  if (flex !== undefined) dynamicStyle.flex = flex;
  if (row) dynamicStyle.flexDirection = "row";
  if (center) {
    dynamicStyle.justifyContent = "center";
    dynamicStyle.alignItems = "center";
  }
  if (centerVertical) dynamicStyle.justifyContent = "center";
  if (centerHorizontal) dynamicStyle.alignItems = "center";
  if (backgroundColor) dynamicStyle.backgroundColor = theme.colors[backgroundColor];

  return (
    <RNView style={[dynamicStyle, style]} {...props}>
      {children}
    </RNView>
  );
}