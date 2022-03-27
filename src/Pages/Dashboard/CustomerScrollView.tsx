import { Observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, LogBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ICustomerSummary } from "../../Core/Stores/Index";
import CollectionSummaryCont from "../../Organs/CollectionSummaryCont";
import CustomerItemForSummary from "../../Organs/CustomerItemForSummary";
import HeaderWithIconText from "../../Organs/HeaderWithIconText";
import SearchBar from "../../Organs/SearchBar";
import { useStores } from "../../Providers/StoresProvider";

interface props {
  handleCustomerClick: (customerId: number) => void;
}

export default function CustomerScrollView(props: props) {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  function getDataAccordingToSearch(
    customers: ICustomerSummary[]
  ): ICustomerSummary[] {
    if (searchPhrase === "") return customers;

    let newCustomers = customers.filter((item) => {
      if (item.customerName.toLowerCase().includes(searchPhrase.toLowerCase()))
        return true;
      else false;
    });
    return newCustomers;
  }

  return (
    <Observer>
      {() => {
        const { CustomersStore } = useStores();
        return (
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[1]}
            nestedScrollEnabled={true}
          >
            <CollectionSummaryCont
              givenAmount={CustomersStore.dashBoardData.totalGiven}
              collectedAmount={CustomersStore.dashBoardData.totalCollected}
            />
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
            <FlatList
              data={getDataAccordingToSearch(
                CustomersStore.dashBoardData.customers
              )}
              keyExtractor={(item, index) => item.customerId.toString()}
              ItemSeparatorComponent={() => <View style={{ height: 1 }}></View>}
              renderItem={({ item }) => {
                return (
                  <CustomerItemForSummary
                    customerName={item.customerName}
                    lastEntryTime={item.lastEntryTimeStamp}
                    amount={item.totalGiven - item.totalCollected}
                    onPress={() => {
                      props.handleCustomerClick(item.customerId);
                    }}
                  />
                );
              }}
              scrollEnabled={false}
            ></FlatList>
          </ScrollView>
        );
      }}
    </Observer>
  );
}
