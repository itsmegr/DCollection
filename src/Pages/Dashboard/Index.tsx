import React, { useEffect, useState } from "react";
import {
  FlatList,
  LogBox,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Screen from "../../Atoms/Screen";
import Colors from "../../Constants/Colors";
import HeaderWithIconText from "../../Organs/HeaderWithIconText";
import CollectionSummaryCont from "../../Organs/CollectionSummaryCont";
import SearchBar from "../../Organs/SearchBar";
import Button from "../../Atoms/Button";

import AddCustomerButton from "./AddCustomerButton";
import CustomerScrollView from "./CustomerScrollView";
import { useStores } from "../../Providers/StoresProvider";
import { Observer } from "mobx-react-lite";
import ActivityLoaderModal from "../../Atoms/ActivityLoaderModal";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../../Navigation/types";
import { StackScreenProps } from "@react-navigation/stack";

type props = StackScreenProps<RootStackParamList, "Dashboard">;

//try to handle all navigation related stuff on Index page
export default function Dashboard({ navigation }: props) {
  function handleCustomerClick(customerId: number) {
    navigation.navigate("CustomerEntries", { customerId: customerId });
  }

  function handleMenuClicked() {
    navigation.navigate("Settings");
  }

  function handleAddCustomerClicked() {
    navigation.navigate("AddCustomer");
  }
  return (
    <Observer>
      {() => {
        const { CustomersStore, UserStore } = useStores();
        return (
          <Screen>
            <ActivityLoaderModal
              isModalVisible={CustomersStore.isLoading}
            ></ActivityLoaderModal>
            <StatusBar backgroundColor={Colors.primaryBlue}></StatusBar>
            <HeaderWithIconText
              icon={"notebook"}
              text={UserStore.user.businessName}
              handleIconPress={() => {}}
              bold
              menu
              handleMenuClick={handleMenuClicked}
            />
            <CustomerScrollView handleCustomerClick={handleCustomerClick} />
            <AddCustomerButton
              handleAddCustomerClicked={handleAddCustomerClicked}
            />
          </Screen>
        );
      }}
    </Observer>
  );
}
