import React from "react";
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";
import Colors from "../Constants/Colors";
import IconWrapper from "./IconWrapper";

interface Props {
  textColor?: ColorValue;
  background?: ColorValue;
  underlayColor?: ColorValue;
  appearance?: "minimal";
  iconBefore?: JSX.Element;
  iconAfter?: JSX.Element;
  width?: number;
  height?: number;
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>; //this style will be applied to outer most view
  fontSize?: number;
  fontWeight?: "bold" | "normal";
}

export default function Button(props: Props) {
  return (
    <TouchableHighlight
      underlayColor={
        props.underlayColor ? props.underlayColor : Colors.secondaryBlue
      }
      onPress={() => {
        props.onPress();
      }}
      style={[styles.touchable, getTouchableHighlightStyle(props), props.style]}
    >
      <View style={styles.view}>
        {props.iconBefore ? <IconWrapper icon={props.iconBefore} /> : null}
        <Text style={[styles.text, getTextStyle(props)]}>{props.text}</Text>
        {props.iconAfter ? <IconWrapper icon={props.iconAfter} /> : null}
      </View>
    </TouchableHighlight>
  );
}

//this is style
function getTextStyle(props: Props) {
  return {
    color: props.textColor ? props.textColor : Colors.white,
    fontSize: props.fontSize
      ? props.fontSize
      : props.height
      ? 0.33 * props.height
      : 17,
    fontWeight: props.fontWeight ? props.fontWeight : "bold",
  };
}

function getTouchableHighlightStyle(props: Props): StyleProp<ViewStyle> {
  return {
    backgroundColor: props.background
      ? props.background
      : props.appearance === "minimal"
      ? Colors.white
      : Colors.primaryBlue,
    width: props.width ? props.width : "80%",
    height: props.height ? props.height : 50,
    borderRadius: props.height ? 0.16 * props.height : 10,
    borderColor:
      props.appearance === "minimal"
        ? props.textColor
        : props.background
        ? props.background
        : Colors.primaryBlue,
    borderWidth: 2,
  };
}

const styles = StyleSheet.create({
  touchable: {
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
