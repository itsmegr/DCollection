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


//try to handle all navigation related stuff on Index page
export default function Dashboard() {
  function handleCustomerClick(customerId : number) {
    console.log("Customer ", customerId, " pressed")
  }
  return (
    <Observer>
      {() => {
        const { CustomersStore } = useStores();
        return (
          <Screen>
            <ActivityLoaderModal
              isModalVisible={CustomersStore.isLoading}
            ></ActivityLoaderModal>
            <StatusBar backgroundColor={Colors.primaryBlue}></StatusBar>
            <HeaderWithIconText
              icon={"notebook"}
              text={"My Business"}
              handleIconPress={() => {}}
              bold
            />
            <CustomerScrollView handleCustomerClick={handleCustomerClick} />
            <AddCustomerButton />
          </Screen>
        );
      }}
    </Observer>
  );
}
