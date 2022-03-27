import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageView from "react-native-image-viewing";
import NameLogo from "../../Atoms/NameLogo";
import Colors from "../../Constants/Colors";
import { MEntry } from "../../Core/Models/Index";
import GetUrisFromImageName from "../../Core/Utils/GetUrisFromImageName";
import GetDateDisplayFormat from "../../Helpers/GetDateDisplayFormat";
import MoneyText from "../../Organs/MoneyText";
import NameWithText from "../../Organs/NameWithText";

interface props {
  entry: MEntry;
  customerName: string;
  totalCollected: number;
  totalGiven: number;
}

export default function EntryInfo(props: props) {
  return (
    <View style={styles.mainCont}>
      <View style={styles.infoCont}>
        <NameAndAmount
          {...props.entry}
          customerName={props.customerName}
        ></NameAndAmount>
        {props.entry.desc != "" && (
          <Description desc={props.entry.desc}></Description>
        )}
        {props.entry.bills.length > 0 && (
          <BillsComponent bills={props.entry.bills}></BillsComponent>
        )}
        {/* <RemainingAmount
          totalCollected={props.totalCollected}
          totalGiven={props.totalGiven}
        ></RemainingAmount> */}
      </View>
    </View>
  );
}

function NameAndAmount({
  customerName,
  amount,
  timeStamp,
  type,
}: {
  customerName: string;
  amount: number;
  timeStamp: Date;
  type: "penalty" | "given" | "collected";
}) {
  return (
    <View style={styles.nameAndAmount}>
      <View style={styles.name}>
        <NameLogo
          text={customerName[0].toUpperCase()}
          backgroundColor={Colors.primaryBlue}
          textColor={Colors.white}
          bold
        ></NameLogo>
        <NameWithText
          name={customerName}
          text={GetDateDisplayFormat(timeStamp)}
          textSize={12}
        ></NameWithText>
      </View>
      <View style={{ alignItems: "center" }}>
        <MoneyText
          amount={amount}
          color={type == "collected" ? Colors.primaryGreen : Colors.primaryRed}
          fontSize={20}
        ></MoneyText>
        <Text
          style={{
            color:
              type == "collected" ? Colors.primaryGreen : Colors.primaryRed,
            fontSize: 12,
          }}
        >
          {type}
        </Text>
      </View>
    </View>
  );
}

function Description({ desc }: { desc: string }) {
  return (
    <View style={styles.description}>
      <Text
        style={{
          color: Colors.secondaryGray,
          fontSize: 14,
        }}
      >
        Details
      </Text>
      <Text
        style={{
          color: Colors.primaryText,
          marginTop: 2,
          fontSize: 15,
        }}
      >
        {desc}
      </Text>
    </View>
  );
}

interface imageType {
  fileName: string;
  uri: string;
}

function BillsComponent({ bills }: { bills: string[] }) {
  const [images, setImages] = useState<Array<imageType>>([]);
  async function getUris() {
    const allImages = await GetUrisFromImageName(bills);
    setImages(allImages);
  }
  useEffect(() => {
    //in starting getting the uris for these fileNames
    getUris();
  }, []);

  const [zoomImageUri, setZoomImageUri] = useState("");
  const [visible, setIsVisible] = useState(false);

  return (
    <View style={styles.bills}>
      <Text
        style={{
          color: Colors.secondaryGray,
          fontSize: 14,
        }}
      >
        Attached Bills
      </Text>

      <View style={{ marginTop: 5, flexDirection: "row", flexWrap: "wrap" }}>
        {images.map((image, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setZoomImageUri(image.uri);
                setIsVisible(true);
              }}
              activeOpacity={0.6}
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
            </TouchableOpacity>
          );
        })}
      </View>
      <ImageView
        images={[{ uri: zoomImageUri }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  );
}

function RemainingAmount({
  totalGiven,
  totalCollected,
}: {
  totalCollected: number;
  totalGiven: number;
}) {
  return (
    <View style={styles.remainingAmount}>
      <Text>
        {totalGiven - totalCollected > 0
          ? "Remaining Amount"
          : "Extra collected"}
      </Text>
      <MoneyText
        amount={
          totalGiven - totalCollected > 0
            ? totalGiven - totalCollected
            : -1 * (totalGiven - totalCollected)
        }
        color={
          totalGiven - totalCollected > 0
            ? Colors.primaryRed
            : Colors.primaryGreen
        }
        fontSize={20}
      ></MoneyText>
    </View>
  );
}

const styles = StyleSheet.create({
  mainCont: {
    width: "100%",
    backgroundColor: Colors.primaryBlue,
    alignItems: "center",
    paddingBottom: 20,
  },
  infoCont: {
    width: "90%",
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  nameAndAmount: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: Colors.secondaryGray,
    borderBottomWidth: 0.2,
  },
  name: {
    flexDirection: "row",
  },
  description: {
    padding: 10,
    borderBottomColor: Colors.secondaryGray,
    borderBottomWidth: 0.2,
  },
  bills: {
    padding: 10,
    borderBottomColor: Colors.secondaryGray,
    borderBottomWidth: 0.2,
  },
  remainingAmount: {
    borderBottomColor: Colors.secondaryGray,
    borderBottomWidth: 0.2,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
