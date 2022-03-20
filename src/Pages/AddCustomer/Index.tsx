import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Screen from "../../Atoms/Screen";
import SvgCustomerInfo from "../../Atoms/SVG/SvgCustomerInfo";
import Colors from "../../Constants/Colors";
import layout from "../../Constants/Layout";
import { RootStackParamList } from "../../Navigation/types";
import HeaderWithIconText from "../../Organs/HeaderWithIconText";
import Form from "./Form";


type props = StackScreenProps<RootStackParamList, "AddCustomer">
export default function AddCustomer({navigation} : props) {
  function handleBackButton() {
    navigation.goBack();
  }

  function onCustomerAdded() {
    //her move to next page
    navigation.navigate("Dashboard");
  }

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Screen style={{ minHeight: layout.window.height }}>
        <StatusBar backgroundColor={Colors.primaryBlue}></StatusBar>
        <HeaderWithIconText
          icon={"arrow-left"}
          text={"Add Customer"}
          handleIconPress={handleBackButton}
        ></HeaderWithIconText>

        <SvgCustomerInfo
          style={{
            alignSelf: "center",
          }}
          height="20%"
          width="50%"
        />
        <Form onCustomerAdded={onCustomerAdded} />
      </Screen>
    </KeyboardAwareScrollView>
  );
}
