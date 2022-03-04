import React from 'react'
import { View, Text, StyleSheet, ColorValue } from 'react-native'
import Button from './Button';

interface props {
  title: string;
  onPress: () => void;
  background?: ColorValue;
  underlayColor?: ColorValue;
}

export default function ButtonAtBottom({title, onPress, background, underlayColor} : props) {
    return (
      <View style={styles.buttonCont}>
        <Button
          style={styles.button}
          onPress={onPress}
          text={title}
          background={background ? background : undefined}
          underlayColor = {underlayColor ? underlayColor : undefined}
        ></Button>
      </View>
    );
}
const styles = StyleSheet.create({
  buttonCont: {
    flex: 1,
    justifyContent: "flex-end",
    width: "90%",
    minHeight: 60,
    alignSelf : "center"
  },
  button: {
    width: "100%",
    marginBottom: 10,
  },
});