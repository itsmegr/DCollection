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

export default function Dashboard() {
  const { CustomersStore } = useStores();
  useEffect(() => {
    //Runs only on the first render
    CustomersStore.fetchData();
  }, []);

  return (
    <Screen>
      <StatusBar backgroundColor={Colors.primaryBlue}></StatusBar>
      <HeaderWithIconText
        icon={"notebook"}
        text={"My Business"}
        handleIconPress={() => {}}
        bold
      />
      <CustomerScrollView />
      <AddCustomerButton />
    </Screen>
  );
}
