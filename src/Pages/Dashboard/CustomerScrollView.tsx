import { Observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, LogBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CollectionSummaryCont from "../../Organs/CollectionSummaryCont";
import CustomerItemForSummary from "../../Organs/CustomerItemForSummary";
import HeaderWithIconText from "../../Organs/HeaderWithIconText";
import SearchBar from "../../Organs/SearchBar";
import { useStores } from "../../Providers/StoresProvider";

export default function CustomerScrollView() {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <Observer>
      {() => {
        const { CustomersStore } = useStores();
        return (
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[2]}
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
              data={CustomersStore.dashBoardData.customers}
              keyExtractor={(item, index) => item.customerId.toString()}
              ItemSeparatorComponent={() => <View style={{ height: 1 }}></View>}
              renderItem={({ item }) => {
                return (
                  <CustomerItemForSummary
                    customerName={item.customerName}
                    lastEntryTime={item.lastEntryTimeStamp}
                    amount={item.totalGiven - item.totalCollected}
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
