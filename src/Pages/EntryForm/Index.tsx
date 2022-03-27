import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { StatusBar } from "react-native";
import Screen from "../../Atoms/Screen";
import Colors from "../../Constants/Colors";
import { MEntry } from "../../Core/Models/Index";
import { RootStackParamList } from "../../Navigation/types";
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

type props = StackScreenProps<RootStackParamList, "EntryForm">;
export default function EntryForm({ navigation, route }: props) {
  let en = route.params.prevEntry;

  function handleBackIconPress() {
    navigation.navigate("CustomerEntries", {
      customerId: route.params.customerId,
    });
  }

  function dataSavedSuccessfully() {
    navigation.navigate("CustomerEntries", {
      customerId: route.params.customerId,
    });
  }

  let headerText;

  if (route.params.type === "collected") headerText = "You Collected";
  else if (route.params.type === "given") headerText = "You Gave";
  else headerText = "Add Penalty"

  return (
    <Screen>
      <StatusBar backgroundColor={Colors.primaryBlue}></StatusBar>
      <HeaderWithIconText
        icon={"arrow-left"}
        text={headerText}
        handleIconPress={handleBackIconPress}
      ></HeaderWithIconText>
      <Form
        customerId={route.params.customerId}
        handleBackIconPress={handleBackIconPress}
        dataSavedSuccessfully={dataSavedSuccessfully}
        edit={route.params.edit}
        prevEntry={route.params.prevEntry}
        type={route.params.type}
      />
    </Screen>
  );
}
