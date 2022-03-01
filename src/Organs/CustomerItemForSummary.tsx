import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Colors from "../Constants/Colors";
import getLastEntryString from "../Helpers/GetLastEntryString";
import MoneyTextWithSomeDetailText from "./MoneyTextWithSomeDetailText";

interface ICustomerItem {
  customerName: string;
  lastEntryTime: Date;
  amount: number;
}
export default function CustomerItemForSummary({
  customerName,
  lastEntryTime,
  amount,
}: ICustomerItem) {
  //logic for showing date

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        backgroundColor: Colors.white
      }}
      onPress={() => {
        console.log("item pressed");
      }}
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
          <NameLogo />
          <NameWithLastEntry
            name={customerName}
            lastEntry={getLastEntryString(lastEntryTime)}
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

function NameWithLastEntry({
  name,
  lastEntry,
}: {
  name: string;
  lastEntry: string;
}) {
  return (
    <View
      style={{
        marginLeft: 8,
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 16 }}>{name}</Text>
      <Text
        style={{
          color: Colors.secondaryGray,
          fontSize: 10,
        }}
      >
        {lastEntry}
      </Text>
    </View>
  );
}

function NameLogo() {
  return (
    <View
      style={{
        width: 45,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        backgroundColor: Colors.primaryBlue,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: Colors.white,
        }}
      >
        T
      </Text>
    </View>
  );
}
