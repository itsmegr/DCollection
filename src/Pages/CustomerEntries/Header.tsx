import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import NameLogo from "../../Atoms/NameLogo";
import Colors from "../../Constants/Colors";
import NameWithText from "../../Organs/NameWithText";

interface headerProps {
  icon: any;
  text: string;
  handleBackButton: () => void;
  handleViewProfile : () => void;
  bold?: boolean;
}

export default function Header({
  icon,
  text,
  handleBackButton,
  handleViewProfile,
  bold,
}: headerProps) {
  return (
    <View style={headerStyles.mainCont}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          handleBackButton();
        }}
      >
        <View style={headerStyles.iconCont}>
          <MaterialCommunityIcons name={icon} size={28} color="white" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={handleViewProfile}
        activeOpacity={0.8}
      >
        <View style={headerStyles.textCont}>
          <NameLogo
            text={text ? text.toUpperCase()[0] : "I"}
            backgroundColor={Colors.white}
            textColor={Colors.primaryBlue}
            bold
          ></NameLogo>
          <NameWithText
            name={text}
            text="Click here to view profile"
            color={Colors.white}
          ></NameWithText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleViewProfile}
        activeOpacity={0.5}
      >
        <View style={headerStyles.menuCont}>
          <Entypo name="dots-three-vertical" size={22} color={Colors.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  mainCont: {
    flexDirection: "row",
    backgroundColor: Colors.primaryBlue,
    minHeight: 50,
    height: "8%",
    alignItems: "center",
  },
  iconCont: {
    paddingRight: 10,
    paddingLeft: 10,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textCont: {
    marginLeft: 10,
    height: "90%",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  menuCont: {
    marginRight: 10,
  },
});
