import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, TouchableOpacity, BackHandler } from "react-native";
import { Feather, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../Constants/Colors";

interface props {
  searchPhrase: string;
  setSearchPhrase : (value : string) => void
  clicked : boolean;
  setClicked : (value : boolean) =>  void
}
const SearchBar = ({searchPhrase, setSearchPhrase, clicked, setClicked} :props) => {
  
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          width: "90%",
        }}
      >
        {/* {clicked && (
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
            style={{
              height : "100%",
              // borderColor : "red",
              // borderWidth : 1,
              paddingVertical : 10,
              paddingHorizontal :5
              
            }}
            activeOpacity={0.5}
          >
            <Entypo name="cross" size={24} color={Colors.secondaryGray} />
          </TouchableOpacity>
        )} */}
        <View
          style={
            styles.searchBar
          }
        >
          {/* search Icon */}
          { (
            <Feather
              name="search"
              size={20}
              color={Colors.secondaryGray}
              style={{ marginLeft: 1 }}
            />
          )}
          {/* Input field */}
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={() => {
              setClicked(true);
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.white,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
    // borderColor: "red",
    // borderWidth : 1
  },
  searchBar: {
    padding: 8,
    flexDirection: "row",
    width: "80%",
    backgroundColor: Colors.white,
    borderRadius: 15,
    alignItems: "center",
    borderColor: Colors.border,
    borderWidth: 0.5,
  },

  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "100%",
  },
});
