import React from "react";
import { StatusBar } from "react-native";
import Screen from "../../Atoms/Screen";
import Colors from "../../Constants/Colors";
import { MEntry } from "../../Core/Models/Index";
import HeaderWithIconText from "../../Organs/HeaderWithIconText";
import Form from "./Form";

/*
  here show different values on header depending on the type of entry you want to add,
  we will get this form last page

  customerId : number
  type : "penalty" | "given" | collected
  edit : boolean
  entry ?: MEntry
*/

export default function EntryForm() {
  let en: MEntry = {
    id: 7,
    customerId: 1,
    type: "collected",
    amount: 200,
    desc: "given to govind",
    bills: ["25a35c84-089f-41ad-8201-e70c5015f1c7.jpg"],
    timeStamp: new Date(),
  };

  function handleBackIconPress() {}

  function dataSavedSuccessfully() {
    console.log("Data saved successfully");
  }

  return (
    <Screen>
      <StatusBar backgroundColor={Colors.primaryBlue}></StatusBar>
      <HeaderWithIconText
        icon={"arrow-left"}
        text={"You Gave"}
        handleIconPress={handleBackIconPress}
      ></HeaderWithIconText>
      <Form
        customerId={1}
        handleBackIconPress={handleBackIconPress}
        dataSavedSuccessfully={dataSavedSuccessfully}
        edit={true}
        prevEntry= {en as MEntry}
      />
    </Screen>
  );
}
