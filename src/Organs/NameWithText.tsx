import React from 'react'
import { View, Text } from 'react-native'
import Colors from '../Constants/Colors';

export default function NameWithText({
  name,
  text,
  color,
  textSize
}: {
  name: string;
  text: string;
  color?: string;
  textSize ? :number
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
          fontSize: textSize ? textSize: 10,
        }}
      >
        {text}
      </Text>
    </View>
  );
}