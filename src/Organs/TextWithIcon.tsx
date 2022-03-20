import React from 'react'
import { View, Text } from 'react-native'
import IconWrapper from '../Atoms/IconWrapper';

interface props {
  icon ?: JSX.Element;
  text ?: string;
  color ?: string;
  fontSize ?: number;
}
export default function TextWithIcon({icon, text, color, fontSize} : props) {
    return (
        <View style={{
            flexDirection : "row",
            alignItems : "center",
            padding : 10
        }}>
            <IconWrapper icon={icon}></IconWrapper>
            <Text style={{
                color : color,
                fontSize : fontSize
                
            }}>{text}</Text>
            
        </View>
    )
}
