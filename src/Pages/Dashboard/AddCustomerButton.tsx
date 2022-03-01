import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Button from "../../Atoms/Button";
import Colors from "../../Constants/Colors";

export default function AddCustomerButton() {
  return (
    <Button
      text=""
      onPress={() => {
        //navigate to the add customer page
        console.log("Add customer button pressed");
      }}
      style={styles.button}
      iconBefore={
        <FontAwesome5 name="user-plus" size={24} color={Colors.white} />
      }
      background={Colors.primaryPink}
      underlayColor={Colors.secondaryPink}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 60,
    right: 10,
    zIndex: 1,
    width: 70,
    borderRadius: 70,
  },
});
