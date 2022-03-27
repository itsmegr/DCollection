import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Button from "../Atoms/Button";
import Input from "../Atoms/Input";
import RBSheet from "react-native-raw-bottom-sheet";
import Colors from "../Constants/Colors";
import { Observer } from "mobx-react-lite";
import isNumeric from "../Helpers/IsNumeric";

interface props {
  oldValue: string;
  getNewValue: (val: string) => void;
  refRBSheet: any;
  mobileNumber?: boolean;
}

export default function EditModal(props: props) {
  return (
    <Observer>
      {() => {
        const [value, setValue] = useState<string>(props.oldValue);
        const [error, setError] = useState("");
        function onTextChange(value: string) {
          if (props.mobileNumber && value !== "" && !isNumeric(value)) {
            setError("Invalid Mobile Number");
          } else setError("");
          setValue(value);
        }
        useEffect(() => {
          setValue(props.oldValue);
        }, [props]);

        function handleSaveButton() {
          if (props.mobileNumber && (!isNumeric(value) || value.length != 10)) {
            setError("Invalid Mobile Number");
            return;
          }
          props.getNewValue(value);
          props.refRBSheet.current.close();
        }

        return (
          <RBSheet
            ref={props.refRBSheet}
            height={150}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent",
              },
              draggableIcon: {
                backgroundColor: Colors.background,
              },
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <Input
                  placeHolder="Enter value"
                  value={value}
                  handleTextChange={onTextChange}
                ></Input>
                {error !== "" && <Text style={styles.errorText}>{error}</Text>}
              </View>
              <Button text="Save" onPress={handleSaveButton}></Button>
            </View>
          </RBSheet>
        );
      }}
    </Observer>
  );
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 10,
    color: Colors.primaryRed,
  },
});
