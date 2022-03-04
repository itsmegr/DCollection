import { StatusBar } from "expo-status-bar";
import { computed } from "mobx";
import { Observer } from "mobx-react-lite";
import React from "react";
import Screen from "../../Atoms/Screen";
import Colors from "../../Constants/Colors";
import { MEntry } from "../../Core/Models/Index";
import { useStores } from "../../Providers/StoresProvider";
import Buttons from "./Buttons";
import EntriesList from "./EntriesList";
import Header from "./Header";

export default function Index() {
  let customerId = 1;
  return (
    <Observer>
      {() => {
        const { CustomersStore } = useStores();

        const customerData = computed(() =>
          CustomersStore.getCustomerData(customerId)
        ).get();

        function handleBackButton() {}
        function handleViewProfile() {}

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
