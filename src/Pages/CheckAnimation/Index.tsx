import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text, Modal, StatusBar, Image } from "react-native";
import Screen from "../../Atoms/Screen";
import Colors from "../../Constants/Colors";
import { RootStackParamList } from "../../Navigation/types";
let img = require("../../../assets/success-check2.gif");

type props = StackScreenProps<RootStackParamList, "CheckAnimation">;
export default function CheckAnimation({ navigation, route }: props) {
  const [showModal, setShowModal] = useState(true);

  async function handleNavigation() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // setShowModal(false);

    navigation.navigate("CustomerEntries", {
      customerId: route.params.customerId,
    });
  }

  useEffect(() => {
    handleNavigation();
  });

  return (
    <Screen>
      <Modal
        style={{
          flex: 1,
          backgroundColor: "red",
        }}
        visible={true}
        animationType="none"
        transparent={false}
      >
        <StatusBar backgroundColor={Colors.white}></StatusBar>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: Colors.white,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image source={img} />
            <Text
              style={{
                fontSize: 18,
                color: Colors.secondaryGray,
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              Entry Saved
            </Text>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
