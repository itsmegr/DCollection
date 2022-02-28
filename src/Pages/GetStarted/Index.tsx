import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../Atoms/Button";
import Screen from "../../Atoms/Screen";
import SvgLogo from "../../Atoms/SVG/SvgLogo";
import Colors from "../../Constants/Colors";
import TagLine from "./Tagline";

export default function GetStarted() {
  return (
    <Screen>
      <StatusBar backgroundColor={Colors.background}></StatusBar>
      <View style={styles.view}>
        <SvgLogo width="80%" height="10%" />
        <TagLine />
        <Button
          onPress={() => {
            console.log("Get started pressed");
          }}
          text="GET STARTED"
          iconAfter={<AntDesign name="arrowright" size={24} color="white" />}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
