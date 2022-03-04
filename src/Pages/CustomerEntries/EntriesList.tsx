import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  LogBox,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import {
  ScrollView,
} from "react-native-gesture-handler";
import Colors from "../../Constants/Colors";
import { MEntry } from "../../Core/Models/Index";
import GetDateDisplayFormat from "../../Helpers/GetDateDisplayFormat";
import numberWithCommas from "../../Helpers/NumberWithComma";
import CollectionSummaryCont from "../../Organs/CollectionSummaryCont";
import MoneyText from "../../Organs/MoneyText";

interface props {
  totalGiven: number;
  totalCollected: number;
  entries: MEntry[];
  handleEntryClicked : (entry : MEntry) => void 
}

const EntriesList = observer((props: props) => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      <CollectionSummaryCont
        givenAmount={props.totalGiven}
        collectedAmount={props.totalCollected}
      />
      <FlatList
        data={props.entries}
        keyExtractor={(item, index) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 1 }}></View>}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.handleEntryClicked(item);
              }}
              activeOpacity={0.6}
            >
              <EntryItem {...item} />
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={<EntryHeader />}
        scrollEnabled={false}
      ></FlatList>
    </ScrollView>
  );
});
// export default function EntriesList(props : props) {

// }
export default EntriesList;

interface entryProps extends MEntry {}

function EntryItem(props: entryProps) {
  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <View style={styles.entryItem}>
        <DateAndDesc date={props.timeStamp} desc={props.desc}></DateAndDesc>
        <GivenPenalty amount={props.amount} type={props.type}></GivenPenalty>
        <Collected amount={props.amount} type={props.type}></Collected>
      </View>
    </View>
  );
}

function DateAndDesc({ date, desc }: { date: Date; desc: string }) {
  return (
    <View style={[styles.dateAndDesc, { height: "100%" }]}>
      <Text style={[styles.textStyle, { marginBottom: 3 }]}>
        {GetDateDisplayFormat(date)}
      </Text>
      <Text style={styles.textStyle}>{desc}</Text>
    </View>
  );
}

function GivenPenalty({
  type,
  amount,
}: {
  type: "given" | "penalty" | "collected";
  amount: number;
}) {
  return (
    <View
      style={[
        styles.givenPenalty,
        { padding: type === "given" || type === "penalty" ? 2 : 0 },
      ]}
    >
      {(type === "given" || type === "penalty") && (
        <MoneyText
          amount={amount}
          color={Colors.primaryRed}
          fontSize={16}
        ></MoneyText>
      )}
      {type === "penalty" && (
        <Text style={{ fontSize: 12, color: Colors.primaryRed }}>
          (Penalty)
        </Text>
      )}
    </View>
  );
}

function Collected({
  type,
  amount,
}: {
  type: "given" | "penalty" | "collected";
  amount: number;
}) {
  return (
    <View
      style={[
        styles.collected,
        {
          padding: type === "collected" ? 2 : 0,
        },
      ]}
    >
      {type === "collected" && (
        <MoneyText
          amount={amount}
          color={Colors.primaryGreen}
          fontSize={16}
        ></MoneyText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  entryItem: {
    width: "95%",
    flexDirection: "row",
    backgroundColor: Colors.white,
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 5,
  },
  textStyle: {
    fontSize: 12,
    color: Colors.secondaryGray,
  },

  dateAndDesc: {
    width: "50%",
    paddingLeft: 10,
  },
  givenPenalty: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondaryRed,
    borderRadius: 5,
  },
  collected: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.tertiaryGreen,
    borderRadius: 5,
  },
});

function EntryHeader() {
  return (
    <View style={{ flexDirection: "row", width: "95%", paddingVertical: 5 }}>
      <View style={styles.dateAndDesc}>
        <Text style={[styles.textStyle, { fontSize: 10 }]}>ENTRY</Text>
      </View>
      <View style={styles.givenPenalty}>
        <Text style={[styles.textStyle, { fontSize: 10 }]}>GIVEN/PENALTY</Text>
      </View>
      <View style={styles.collected}>
        <Text style={[styles.textStyle, { fontSize: 10 }]}>COLLECTED</Text>
      </View>
    </View>
  );
}
