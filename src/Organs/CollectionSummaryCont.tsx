import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Colors from '../Constants/Colors';
import MoneyTextWithSomeDetailText from './MoneyTextWithSomeDetailText';
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface props {
    givenAmount : number;
    collectedAmount : number;
}

export default function CollectionSummaryCont({givenAmount, collectedAmount}:props) {
  return (
    <View style={{ width: "100%" }}>
      <UnderlayColor />
      <SummaryBox givenAmount={givenAmount} collectedAmount={collectedAmount} />
    </View>
  );
}

function UnderlayColor() {
  return (
    <View
      style={{
        height: 40,
        backgroundColor: Colors.primaryBlue,
        width: "100%",
      }}
    ></View>
  );
}


function SummaryBox({ givenAmount, collectedAmount }: props) {
  return (
    <View
      style={{
        height: 120,
        width: "90%",
        alignSelf: "center",
        top: -40,
        backgroundColor: Colors.white,
        elevation: 5,
        borderRadius: 10,
        marginBottom: -40,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomColor: Colors.background,
          borderBottomWidth: 1,
          height: "70%",
          alignItems: "center",
        }}
      >
        <MoneyTextWithSomeDetailText
          color={Colors.primaryRed}
          amount={givenAmount}
          textBelow="Total given"
          moneyTextSize={20}
          descFontSize={12}
        />
        <MoneyBoxSeparator />
        <MoneyTextWithSomeDetailText
          color={Colors.primaryGreen}
          amount={collectedAmount}
          textBelow="Total Collected"
          moneyTextSize={20}
          descFontSize={12}
        />
      </View>
      <ViewReportButton />
    </View>
  );
}

function MoneyBoxSeparator() {
  return (
    <View
      style={{
        width: 1,
        height: "70%",
        backgroundColor: Colors.background,
      }}
    ></View>
  );
}

function ViewReportButton() {
  return (
    <TouchableOpacity
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onPress={() => console.log("View Report pressed")}
      activeOpacity={0.7}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: Colors.primaryBlue,
            fontWeight: "normal",
            fontSize: 16,
          }}
        >
          View Report
        </Text>
        <MaterialCommunityIcons
          name={"chevron-right"}
          size={25}
          color={Colors.primaryBlue}
        />
      </View>
    </TouchableOpacity>
  );
}
