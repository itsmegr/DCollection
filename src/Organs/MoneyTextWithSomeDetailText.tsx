import React from "react";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MoneyText from "./MoneyText";
import Colors from "../Constants/Colors";

interface IMonetBox {
  amount: number;
  color: string;
  textBelow: string;
  moneyTextSize: number;
  descFontSize: number;
}

export default function MoneyTextWithSomeDetailText({
  color,
  amount,
  textBelow,
  moneyTextSize,
  descFontSize,
}: IMonetBox) {
  return (
    <View
      style={{
        padding: 10,
        alignItems: "center",
      }}
    >
      <MoneyText amount={amount} color={color} fontSize={moneyTextSize} />

      <Text
        style={{
          color: Colors.secondaryGray,
          fontSize: descFontSize,
          marginTop: 3,
        }}
      >
        {textBelow}
      </Text>
    </View>
  );
}
