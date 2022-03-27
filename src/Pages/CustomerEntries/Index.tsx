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
  return (
    <Observer>
      {() => {
        let customerId = route.params.customerId;
        const { CustomersStore } = useStores();

        const customerData = computed(() =>
          CustomersStore.getCustomerData(customerId)
        ).get();

        function handleBackButton() {
          navigation.goBack();
        }
        function handleViewProfile() {
          navigation.navigate("CustomerProfile", { customerId: customerId });
        }

        function handleEntryClicked(entry: MEntry) {
          navigation.navigate("EntryDetail", {
            customer: customerData.customer,
            entry: entry,
            totalCollected: customerData.totalCollected,
            totalGiven: customerData.totalGiven,
          });
        }

        function handleYouCollected() {
          navigation.navigate("EntryForm", {
            customerId: customerId,
            type: "collected",
            edit: false,
            prevEntry: {} as MEntry,
          });
        }

        function handleAddPenalty() {
          navigation.navigate("EntryForm", {
            customerId: customerId,
            type: "penalty",
            edit: false,
            prevEntry: {} as MEntry,
          });
        }
        function handleYouGave() {
          navigation.navigate("EntryForm", {
            customerId: customerId,
            type: "given",
            edit: false,
            prevEntry: {} as MEntry,
          });
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
            <Buttons
              handleYouCollected={handleYouCollected}
              handleYouGave={handleYouGave}
              handleAddPenalty={handleAddPenalty}
            />
          </Screen>
        );
      }}
    </Observer>
  );
}
