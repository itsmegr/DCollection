import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../Constants/Colors";
import layout from "../Constants/Layout";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Screen({ children, style }: Props) {
  return (
    <SafeAreaView style={[styles.safeAreaView, style]}>{children}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
