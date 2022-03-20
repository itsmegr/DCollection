import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Button from "../../Atoms/Button";
import Colors from "../../Constants/Colors";

type props  = {
  handleAddCustomerClicked : () => void;
}

export default function AddCustomerButton(props : props) {
  return (
    <Button
      text=""
      onPress={props.handleAddCustomerClicked}
      style={styles.button}
      iconBefore={
        <FontAwesome5 name="user-plus" size={20} color={Colors.white} />
      }
      background={Colors.primaryPink}
      underlayColor={Colors.secondaryPink}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 1,
    width: 60,
    borderRadius:650,
  },
});
