import React from "react";
import { View, StyleSheet } from "react-native";

interface IconWrapperProps {
  icon ?: JSX.Element;
  marginLeft ?: number;
  marginRight ?: number;
}
export default function IconWrapper({ icon , marginLeft, marginRight}: IconWrapperProps) {
  return <View style={[{ marginLeft: marginLeft ? marginLeft : 10, marginRight: marginRight ? marginRight : 10 }]}>{icon}</View>;
}

