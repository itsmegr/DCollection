import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../../Atoms/Button";
import Colors from "../../Constants/Colors";

export default function Buttons() {
    return (
      <View style={styles.allButtonCont}>
        <View style={styles.collectedButton}>
          <Button
            height={45}
            background={Colors.primaryGreen}
            underlayColor={Colors.secondaryGreen}
            style={styles.button1}
            onPress={() => {}}
            text={"You Collected"}
          />
        </View>

        <View style={styles.givenPenalty}>
          <View
            style={{
              width: "48%",
            }}
          >
            <Button
              height={45}
              background={Colors.primaryRed}
              underlayColor={Colors.secondaryRed}
              style={styles.button1}
              onPress={() => {}}
              text={"You Gave"}
            />
          </View>
          <View
            style={{
              width: "48%",
            }}
          >
            <Button
              height={45}
              style={styles.button1}
              onPress={() => {}}
              text={"Add Penalty"}
            />
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  allButtonCont: {
    justifyContent: "flex-end",
    width: "100%",
    // minHeight: 60,
    alignItems: "center",
  },
  collectedButton: {
    width: "90%",
  },
  button1: {
    width: "100%",
    marginBottom: 5,
  },
  givenPenalty: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
