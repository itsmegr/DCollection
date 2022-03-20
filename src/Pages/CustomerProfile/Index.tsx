import React, { useRef, useState } from "react";
import { View, Text, StatusBar } from "react-native";

import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { Observer } from "mobx-react-lite";
import { ScrollView } from "react-native-gesture-handler";
import { useStores } from "../../Providers/StoresProvider";
import Colors from "../../Constants/Colors";
import HeaderWithIconText from "../../Organs/HeaderWithIconText";
import TextWithIcon from "../../Organs/TextWithIcon";
import Screen from "../../Atoms/Screen";
import DataWithIconAndEdit from "../../Organs/DataWithIconAndEdit";
import EditModal from "../../Organs/EditModal";
import { computed } from "mobx";

export default function CustomerProfile() {
  let customerId = 1;

  return (
    <Observer>
      {() => {

        function handleBackButton(){
          console.log("Back button pressed");
          
        }

        const refRBSheet = useRef<any>();
        const { CustomersStore } = useStores();

        const customerProfile = computed(() =>
          CustomersStore.getCustomerProfile(customerId)
        ).get();

        type IOldValue = {
          type:
            | "name"
            | "mobileNumber"
            | "address"
            | "guarantorName"
            | "guarantorMobileNumber";
          value: string;
        };

        const [oldValue, setOldValue] = useState<IOldValue>({} as IOldValue);

        async function setNewValue(value: string) {
          switch (oldValue.type) {
            case "name":
              return await CustomersStore.updateCustomer(customerId, {
                ...customerProfile,
                name: value,
              });
            case "mobileNumber":
              return await CustomersStore.updateCustomer(customerId, {
                ...customerProfile,
                mobileNumber: value,
              });
            case "address":
              return await CustomersStore.updateCustomer(customerId, {
                ...customerProfile,
                address: value,
              });
            case "guarantorName":
              return await CustomersStore.updateCustomer(customerId, {
                ...customerProfile,
                guarantorName: value,
              });
            case "guarantorMobileNumber":
              return await CustomersStore.updateCustomer(customerId, {
                ...customerProfile,
                guarantorMobileNumber: value,
              });
            default:
              return "";
          }
        }

        return (
          <Screen>
            <StatusBar backgroundColor={Colors.primaryBlue}></StatusBar>
            <HeaderWithIconText
              icon={"arrow-left"}
              text={"Customer Profile"}
              handleIconPress={handleBackButton}
              bold
            ></HeaderWithIconText>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
            >
              <DataWithIconAndEdit
                icon={
                  <Ionicons
                    name="person-outline"
                    size={24}
                    color={Colors.primaryText}
                  />
                }
                heading="Name"
                value={customerProfile.name}
                onPress={() => {
                  setOldValue({ type: "name", value: customerProfile.name });
                  refRBSheet.current.open();
                }}
              />
              <DataWithIconAndEdit
                icon={
                  <Feather name="phone" size={24} color={Colors.primaryText} />
                }
                heading="Mobile Number"
                value={customerProfile.mobileNumber}
                onPress={() => {
                  setOldValue({
                    type: "mobileNumber",
                    value: customerProfile.mobileNumber,
                  });
                  refRBSheet.current.open();
                }}
              />

              <DataWithIconAndEdit
                icon={<Entypo name="address" size={24} color="black" />}
                heading="Address"
                value={customerProfile.address}
                onPress={() => {
                  setOldValue({
                    type: "address",
                    value: customerProfile.address,
                  });
                  refRBSheet.current.open();
                }}
              />

              <DataWithIconAndEdit
                icon={
                  <MaterialCommunityIcons
                    name={"notebook"}
                    size={24}
                    color={Colors.primaryText}
                  />
                }
                heading="Guarantor Name"
                value={customerProfile.guarantorName}
                onPress={() => {
                  setOldValue({
                    type: "guarantorName",
                    value: customerProfile.guarantorName,
                  });
                  refRBSheet.current.open();
                }}
              />

              <DataWithIconAndEdit
                icon={
                  <Feather name="phone" size={24} color={Colors.primaryText} />
                }
                heading="Guarantor Mobile Number"
                value={customerProfile.guarantorMobileNumber}
                onPress={() => {
                  setOldValue({
                    type: "guarantorMobileNumber",
                    value: customerProfile.guarantorMobileNumber,
                  });
                  refRBSheet.current.open();
                }}
              />
            </ScrollView>
            <EditModal
              oldValue={oldValue.value}
              getNewValue={setNewValue}
              refRBSheet={refRBSheet}
            ></EditModal>
          </Screen>
        );
      }}
    </Observer>
  );
}
