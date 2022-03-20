import { AntDesign } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../../Atoms/Button";
import Screen from "../../Atoms/Screen";
import SvgLogo from "../../Atoms/SVG/SvgLogo";
import Colors from "../../Constants/Colors";
import { RootStackParamList } from "../../Navigation/types";
import TagLine from "./Tagline";

type props = StackScreenProps<RootStackParamList, "GetStarted">;
export default function GetStarted({ navigation }: props) {
  return (
    <Screen>
      <StatusBar backgroundColor={Colors.background}></StatusBar>
      <View style={styles.view}>
        <SvgLogo width="80%" height="10%" />
        <TagLine />
        <Button
          onPress={() => {
            navigation.navigate("Dashboard");
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
