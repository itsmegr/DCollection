import React from "react";
import { StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Screen from "../../Atoms/Screen";
import SvgCustomerInfo from "../../Atoms/SVG/SvgCustomerInfo";
import Colors from "../../Constants/Colors";
import layout from "../../Constants/Layout";
import HeaderWithIconText from "../../Organs/HeaderWithIconText";
import Form from "./Form";

export default function AddCustomer() {
  function handleBackButton() {
    console.log("Icon pressed");
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
        <Form />
      </Screen>
    </KeyboardAwareScrollView>
  );
}
