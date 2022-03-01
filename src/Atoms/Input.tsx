import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../Constants/Colors";

interface IconWrapperProps {
  icon: JSX.Element;
}

function IconWrapper({ icon }: IconWrapperProps) {
  return <View style={styles.iconWrapper}>{icon}</View>;
}

interface props {
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  autoCorrect?:boolean,
  color?: string;
  fontSize?: number;
  handleTextChange: (text: string) => void;
  iconBefore?: JSX.Element;
  keyboard?: KeyboardTypeOptions;
  placeHolder: string;
  style?: StyleProp<ViewStyle>; //this style will be attached to out container
  onBlur ?: () => void;
  value ?: string;
  lineNumber?: number;
}

export default function Input({
  autoCapitalize,
  autoCorrect,
  handleTextChange,
  placeHolder,
  keyboard,
  style,
  fontSize,
  color,
  iconBefore,
  onBlur,
  value,
  lineNumber
}: props) {
  return (
    <View style={[styles.container, style]}>
      {iconBefore ? <IconWrapper icon={iconBefore} /> : null}
      <TextInput
        style={{
          fontSize: fontSize ? fontSize : 18,
          color: color ? color : Colors.primaryText,
          width : "100%",
        }}
        placeholder={placeHolder}
        keyboardType={keyboard ? keyboard : "default"}
        onChangeText={handleTextChange}
        autoCapitalize={autoCapitalize}
        autoCorrect= {autoCorrect}
        onBlur={onBlur ? onBlur : ()=>{}}
        value={value}
        numberOfLines={lineNumber ? lineNumber : 1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    padding: 10,
    borderColor: Colors.secondaryGray,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.white,
    // maxWidth: "90%",
  },
  iconWrapper: {
    marginLeft: 10,
    marginRight: 10,
  },
});
