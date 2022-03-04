import React, { useState } from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../Constants/Colors";

interface props {
  currentDate: Date;
  handleDateChange: (event: any, selectedDate: Date | undefined) => void;
  style: StyleProp<ViewStyle>[];
}

export default function DatePickerButton({
  currentDate,
  handleDateChange,
  style=[],
}: props) {

  const [DateModal, setDateModal] = useState(false);
  
  return (
    <>
      <View style={[...style]}>
        <TouchableWithoutFeedback onPress={() => setDateModal(true)}>
          <View style={styles.dateView}>
            <View style ={styles.iconWrapper}>
              <MaterialCommunityIcons name="calendar" size={24} color={Colors.primaryGreen} />
            </View>
            <Text style={styles.dateText}>
              {currentDate.toISOString().split("T")[0]}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        {DateModal && (
          <DateTimePicker
            testID="dateTimePicker"
            value={currentDate}
            is24Hour={true}
            display="default"
            onChange={(event: any, selectedDate: Date | undefined) => {
              setDateModal(false);
              handleDateChange(event, selectedDate);
            }}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dateView: {
    borderWidth: 1,
    borderColor: Colors.secondaryGray,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  dateText: {
    fontSize: 15,
  },
  iconWrapper : {
      marginRight: 5,
  }
});
