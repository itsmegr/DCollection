import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import NameLogo from "../Atoms/NameLogo";
import Colors from "../Constants/Colors";
import getLastEntryString from "../Helpers/GetLastEntryString";
import MoneyTextWithSomeDetailText from "./MoneyTextWithSomeDetailText";
import NameWithText from "./NameWithText";

interface ICustomerItem {
  customerName: string;
  lastEntryTime: Date;
  amount: number;
  onPress : () => void
}
export default function CustomerItemForSummary({
  customerName,
  lastEntryTime,
  amount,
  onPress
}: ICustomerItem) {
  //logic for showing date

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        backgroundColor: Colors.white,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          paddingVertical: 6,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <NameLogo
            text={customerName[0].toUpperCase()}
            backgroundColor={Colors.primaryBlue}
            textColor={Colors.white}
          />
          <NameWithText
            name={customerName}
            text={getLastEntryString(lastEntryTime)}
          />
        </View>
        <MoneyTextWithSomeDetailText
          color={Colors.primaryGreen}
          amount={amount}
          textBelow="Remaining"
          moneyTextSize={16}
          descFontSize={10}
        />
      </View>
    </TouchableOpacity>
  );
}

