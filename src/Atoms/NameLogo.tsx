import React from "react";
import { Text, View } from "react-native";
import Colors from "../Constants/Colors";

interface props {
  text: string;
  backgroundColor : string,
  textColor : string;
  bold ?: boolean
}
export default function NameLogo({ text, backgroundColor, textColor, bold }: props) {
  return (
    <View
      style={{
        width: 45,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 45,
        backgroundColor: backgroundColor,
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: bold ? "bold" : "normal",
          color: textColor,
        }}
      >
        {text}
      </Text>
    </View>
  );
}
