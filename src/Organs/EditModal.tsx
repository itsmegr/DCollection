import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import Button from "../Atoms/Button";
import Input from "../Atoms/Input";
import RBSheet from "react-native-raw-bottom-sheet";
import Colors from "../Constants/Colors";
import { Observer } from "mobx-react-lite";

interface props {
  oldValue: string;
  getNewValue: (val: string) => void;
  refRBSheet: any;
}

export default function EditModal(props: props) {
  return (
    <Observer>
      {() => {
        const [value, setValue] = useState<string>(props.oldValue);
        useEffect(() => {
          setValue(props.oldValue);
        }, [props]);

        function handleSaveButton() {
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
              <Input
                placeHolder="Enter value"
                value={value}
                handleTextChange={(val) => setValue(val)}
                style={{ marginBottom: 10 }}
              ></Input>
              <Button text="Save" onPress={handleSaveButton}></Button>
            </View>
          </RBSheet>
        );
      }}
    </Observer>
  );
}
