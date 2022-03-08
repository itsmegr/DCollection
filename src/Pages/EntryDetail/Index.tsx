import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Button from "../../Atoms/Button";
import Screen from "../../Atoms/Screen";
import Colors from "../../Constants/Colors";
import { MEntry } from "../../Core/Models/Index";
import HeaderWithIconText from "../../Organs/HeaderWithIconText";
import EntryInfo from "./EntryInfo";

/*
    TODO :- Handle edit and delete button (run store functions)
*/

export default function Index() {
  let en: MEntry = {
    id: 7,
    customerId: 1,
    type: "collected",
    amount: 200,
    desc: `given to govind`,
    bills: [
      "5ed38a0c-80a0-4fe2-a877-02e7a59d4640.jpg",
      "a657450b-d498-45dc-ab28-76ba5ff569fa.jpg",
    ],
    timeStamp: new Date(),
  };
  let customerName = "Tanish Gupta";
  let totalCollected  = 4530
  let totalGiven = 10000

  function handleBackButton() {}
  return (
    <Screen>
      <HeaderWithIconText
        icon={"arrow-left"}
        text={"Entry Details"}
        handleIconPress={handleBackButton}
      />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <EntryInfo
          totalCollected={totalCollected}
          totalGiven={totalGiven}
          entry={en}
          customerName={customerName}
        />
      </ScrollView>

      <View style={styles.allButtonCont}>
        <View style={styles.givenPenalty}>
          <View
            style={{
              width: "48%",
            }}
          >
            <Button
              height={45}
              style={styles.button1}
              onPress={() => {}}
              text={"Delete Entry"}
              appearance="minimal"
              textColor={Colors.primaryRed}
              underlayColor={Colors.primaryGray}
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
              text={"Edit Penalty"}
              appearance="minimal"
              textColor={Colors.primaryBlue}
              underlayColor={Colors.primaryGray}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}


const styles = StyleSheet.create({
  allButtonCont: {
    // flex: 1,
    // justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
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