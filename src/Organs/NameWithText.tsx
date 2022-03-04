import React from 'react'
import { View, Text } from 'react-native'
import Colors from '../Constants/Colors';

export default function NameWithText({
  name,
  text,
  color,
}: {
  name: string;
  text: string;
  color?: string;
}) {
  return (
    <View
      style={{
        marginLeft: 8,
        justifyContent: "center",
      }}
    >
      <Text style={{ color: color ? color : Colors.primaryText, fontSize: 18 }}>
        {name}
      </Text>
      <Text
        style={{
          color: color ? color : Colors.secondaryGray,
          fontSize: 10,
        }}
      >
        {text}
      </Text>
    </View>
  );
}