import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";
import numberWithCommas from '../Helpers/NumberWithComma';

interface props {
    fontSize : number;
    color : string;
    amount : number;
}

export default function MoneyText({fontSize, color, amount} : props) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent :"center" }}>
        <FontAwesome name="rupee" size={fontSize} color={color} />
        <Text
          style={{
            textAlign: "center",
            fontSize: fontSize,
            marginLeft: 1,
            color: color,
            fontWeight: "600",
          }}
        >
          {numberWithCommas(amount)}
        </Text>
      </View>
    );
}
