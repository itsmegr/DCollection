import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native'
import Colors from '../Constants/Colors';

interface headerProps {
  icon: any;
  text: string;
  handleIconPress: () => void;
  bold ?: boolean;
  menu? : boolean
  handleMenuClick ?: () => void
}

export default function HeaderWithIconText({ icon, text, handleIconPress, bold, menu, handleMenuClick }: headerProps) {
return (
  <View style={headerStyles.mainCont}>
    <TouchableHighlight
      underlayColor={Colors.secondaryBlue}
      onPress={() => {
        handleIconPress();
      }}
    >
      <View style={headerStyles.iconCont}>
        <MaterialCommunityIcons name={icon} size={28} color="white" />
      </View>
    </TouchableHighlight>
    <View style={headerStyles.textCont}>
      <Text
        style={[
          headerStyles.text,
          {
            fontWeight: bold ? "bold" : "normal",
          },
        ]}
      >
        {text}
      </Text>
      {menu && (
        <TouchableOpacity onPress={handleMenuClick} activeOpacity={0.5}>
          <View style={headerStyles.menuCont}>
            <Entypo name="dots-three-vertical" size={22} color={Colors.white} />
          </View>
        </TouchableOpacity>
      )}
    </View>
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
    elevation: 5,
  },
  iconCont: {
    paddingRight: 10,
    paddingLeft: 10,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.white,
    fontWeight: "normal",
    fontSize: 18,
  },
  textCont: {
    marginLeft: 10,
    height: "90%",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent : "space-between"
  },
  menuCont: {
    marginRight: 10,
  },
});

