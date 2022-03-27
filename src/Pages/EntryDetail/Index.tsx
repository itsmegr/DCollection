import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  Alert,
  LogBox,
  ScrollView,
  StyleSheet,
  View,
  YellowBox,
} from "react-native";
import Button from "../../Atoms/Button";
import Screen from "../../Atoms/Screen";
import Colors from "../../Constants/Colors";
import { MEntry } from "../../Core/Models/Index";
import { RootStackParamList } from "../../Navigation/types";
import HeaderWithIconText from "../../Organs/HeaderWithIconText";
import { useStores } from "../../Providers/StoresProvider";
import EntryInfo from "./EntryInfo";

/*
    TODO :- Handle edit and delete button (run store functions)
*/
type props = StackScreenProps<RootStackParamList, "EntryDetail">;

export default function Index({ navigation, route }: props) {
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const { CustomersStore } = useStores();

  let en: MEntry = route.params.entry;

  let customerName = route.params.customer.name;
  let totalCollected = route.params.totalCollected;
  let totalGiven = route.params.totalGiven;

  function handleBackButton() {
    navigation.goBack();
  }

  function handleEditEntry() {
    navigation.navigate("EntryForm", {
      customerId: route.params.customer.id,
      type: route.params.entry.type,
      edit: true,
      prevEntry: route.params.entry,
    });
  }

  function onSuccess() {
    navigation.navigate("CustomerEntries", {
      customerId: route.params.customer.id,
    });
  }

  async function handleDeleteEntry() {
    await CustomersStore.deleteEntry(route.params.entry.id);
    onSuccess();
  }

  return (
    <Screen>
      <HeaderWithIconText
        icon={"arrow-left"}
        text={"Entry Details"}
        handleIconPress={handleBackButton}
      />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <EntryInfo
          totalCollected={totalCollected}
          totalGiven={totalGiven}
          entry={en}
          customerName={customerName}
        />
      </ScrollView>

      <View style={styles.allButtonCont}>
        <View style={styles.givenPenalty}>
          <View
            style={{
              width: "48%",
            }}
          >
            <Button
              height={45}
              style={styles.button1}
              onPress={() => {
                Alert.alert(
                  "Delete",
                  "Are you sure you want to delete this entry?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => {},
                    },
                    {
                      text: "Delete",
                      onPress: () => {
                        handleDeleteEntry();
                      },
                    },
                  ]
                );
              }}
              text={"Delete Entry"}
              appearance="minimal"
              textColor={Colors.primaryRed}
              underlayColor={Colors.primaryGray}
            />
          </View>
          <View
            style={{
              width: "48%",
            }}
          >
            <Button
              height={45}
              style={styles.button1}
              onPress={handleEditEntry}
              text={"Edit Penalty"}
              appearance="minimal"
              textColor={Colors.primaryBlue}
              underlayColor={Colors.primaryGray}
            />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  allButtonCont: {
    // flex: 1,
    // justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },
  button1: {
    width: "100%",
    marginBottom: 5,
  },
  givenPenalty: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
