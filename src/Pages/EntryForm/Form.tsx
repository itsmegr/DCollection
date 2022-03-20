import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Input from "../../Atoms/Input";
import DatePickerButton from "../../Organs/DatePickerButton";
import Button from "../../Atoms/Button";
import Colors from "../../Constants/Colors";
import ButtonAtBottom from "../../Atoms/ButtonAtBottom";
import SaveToPhoneStorage from "../../Core/Utils/SaveToPhoneStorage";
import isNumeric from "../../Helpers/IsNumeric";
import { useStores } from "../../Providers/StoresProvider";
import { number } from "yup";
import getRandomNumber from "../../Helpers/Random";
import { MEntry } from "../../Core/Models/Index";
import GetUrisFromImageName from "../../Core/Utils/GetUrisFromImageName";

interface props {
  customerId: number;
  handleBackIconPress: () => void;
  dataSavedSuccessfully: () => void;
  edit: boolean;
  prevEntry: MEntry;
}

interface imageType {
  fileName: string;
  uri: string;
}

export default function Form(props: props) {
  const [amount, setAmount] = useState(
    props.edit ? props.prevEntry.amount.toString() : ""
  );
  const [desc, setDesc] = useState(props.edit ? props.prevEntry.desc : "");
  const [date, setDate] = useState(
    props.edit ? props.prevEntry.timeStamp : new Date()
  );
  const [error, setError] = useState(false);

  const [images, setImages] = useState<Array<imageType>>([]);

  async function getUris() {
    const allImages = await GetUrisFromImageName(props.prevEntry.bills);

    setImages(allImages);
  }
  useEffect(() => {
    //in starting getting the uris for these fileNames
    if (props.edit) getUris();
  }, []);

  const { CustomersStore } = useStores();

  async function handleSaveButton() {
    let newEntry: MEntry = {
      id: props.edit ? props.prevEntry.id : getRandomNumber(),
      customerId: props.customerId,
      amount: parseInt(amount),
      type: "collected",
      desc: desc,
      bills: images.map((val) => val.fileName),
      timeStamp: new Date(),
    };

    if (props.edit) {
      await CustomersStore.updateEntry(props.prevEntry.id, newEntry);
    } else await CustomersStore.addEntry(newEntry);
    //after saving the data in store
    console.log(newEntry);
    props.dataSavedSuccessfully();
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      let [fileName1] = await SaveToPhoneStorage([result.uri]);
      let [newImage] = await GetUrisFromImageName([fileName1]);
      setImages([...images, newImage]);
    }
  };

  function handleDeleteImage(deleImage: imageType) {
    let newImages = images.filter(
      (value) =>
        value.fileName !== deleImage.fileName || value.uri !== deleImage.uri
    );
    setImages(newImages);
  }

  function handleAmountChange(amount: string) {
    if (isNumeric(amount) || amount === "") {
      setError(false);
    } else setError(true);
    setAmount(amount);
  }

  return (
    <>
      <View style={styles.formCont}>
        <View style={styles.item}>
          <Input
            placeHolder="Enter Amount"
            handleTextChange={handleAmountChange}
            style={styles.amountInput}
            fontSize={25}
            iconBefore={
              <FontAwesome name="rupee" size={24} color={Colors.primaryGreen} />
            }
            keyboard="numeric"
            value={amount}
            color={Colors.primaryGreen}
          />
          {error && (
            <Text style={styles.errorText}>Please enter a valid amount</Text>
          )}
        </View>

        <View style={styles.item}>
          <Input
            placeHolder="Enter Description"
            handleTextChange={(description) => setDesc(description)}
            style={styles.input}
            fontSize={15}
            value={desc}
            lineNumber={1}
          />
        </View>

        <View style={styles.dateRow}>
          <DatePickerButton
            currentDate={date}
            handleDateChange={(event: any, selectedDate: Date | undefined) =>
              setDate(selectedDate || date)
            }
            style={[styles.item]}
          />
          <Button
            text="Add bills"
            style={styles.imagePickerButton}
            onPress={pickImage}
            fontSize={14}
            iconBefore={
              <FontAwesome
                name="camera"
                size={20}
                color={Colors.primaryGreen}
              />
            }
            textColor={"black"}
            background={Colors.white}
            underlayColor={Colors.background}
            fontWeight="normal"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            // alignSelf: "flex-end",
            // marginRight : 10
            justifyContent: "flex-end",
            width: "95%",
            flexWrap: "wrap",
          }}
        >
          {images.map((image, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onLongPress={() => {
                  Alert.alert(
                    "Delete",
                    "Are you sure you want to delete this bill?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => {},
                      },
                      {
                        text: "Delete",
                        onPress: () => {
                          handleDeleteImage(image);
                        },
                      },
                    ]
                  );
                }}
              >
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    marginLeft: 5,
                    borderRadius: 5,
                    marginBottom: 5,
                  }}
                  source={{ uri: image.uri }}
                />
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
      <ButtonAtBottom onPress={handleSaveButton} title={"Save"} />
    </>
  );
}

const styles = StyleSheet.create({
  formCont: {
    flex: 1,
    alignItems: "center",
  },
  item: {
    marginBottom: 10,
  },
  amountInput: {
    marginTop: 10,
    width: "95%",
    maxWidth: "95%",
  },
  input: {
    width: "95%",
  },
  errorText: {
    fontSize: 10,
    color: Colors.primaryRed,
  },
  dateRow: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imagePickerButton: {
    width: "35%",
  },
});
