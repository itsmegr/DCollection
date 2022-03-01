import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TagLine() {
  return (
    <View style={styles.descView}>
      <Text style={styles.descText}>Now Daily Collection become easy!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  descView: {
    width: "60%",
  },
  descText: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
  },
});
