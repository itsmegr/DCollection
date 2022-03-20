import { StackScreenProps } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { computed } from "mobx";
import { Observer } from "mobx-react-lite";
import React from "react";
import Screen from "../../Atoms/Screen";
import Colors from "../../Constants/Colors";
import { MEntry } from "../../Core/Models/Index";
import { RootStackParamList } from "../../Navigation/types";

import { useStores } from "../../Providers/StoresProvider";
import Buttons from "./Buttons";
import EntriesList from "./EntriesList";
import Header from "./Header";

type props = StackScreenProps<RootStackParamList, "CustomerEntries">;
export default function Index({ navigation, route }: props) {
  let customerId = route.params.customerId;
  return (
    <Observer>
      {() => {
        const { CustomersStore } = useStores();

        const customerData = computed(() =>
          CustomersStore.getCustomerData(customerId)
        ).get();

        function handleBackButton() {
          navigation.goBack();
        }
        function handleViewProfile() {
          navigation.navigate("CustomerProfile", {customerId : customerId});
        }

        function handleEntryClicked(entry: MEntry) {
          console.log("Entry with id ", entry.id, " Clicked");
        }

        return (
          <Screen>
            <StatusBar backgroundColor={Colors.primaryBlue}></StatusBar>
            <Header
              icon={"arrow-left"}
              text={customerData.customer.name}
              handleBackButton={handleBackButton}
              handleViewProfile={handleViewProfile}
              bold
            />
            <EntriesList
              entries={customerData.entries}
              totalGiven={customerData.totalGiven}
              totalCollected={customerData.totalCollected}
              handleEntryClicked={handleEntryClicked}
            ></EntriesList>
            <Buttons />
          </Screen>
        );
      }}
    </Observer>
  );
}
