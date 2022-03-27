import React, { useRef, useState } from "react";
import { View, Text, StatusBar } from "react-native";

import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Screen from "../../Atoms/Screen";
import HeaderWithIconText from "../../Organs/HeaderWithIconText";
import Colors from "../../Constants/Colors";
import TextWithIcon from "../../Organs/TextWithIcon";
import DataWithIconAndEdit from "../../Organs/DataWithIconAndEdit";
import EditModal from "../../Organs/EditModal";
import { Observer } from "mobx-react-lite";
import { useStores } from "../../Providers/StoresProvider";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootStackParamList } from "../../Navigation/types";

type props = BottomTabScreenProps<RootStackParamList, "Settings">;
export default function Settings({ navigation }: props) {
  return (
    <Observer>
      {() => {
        const refRBSheet = useRef<any>();
        const { UserStore } = useStores();

        type IOldValue = {
          type: "name" | "mobileNumber" | "businessName";
          value: string;
        };

        const [oldValue, setOldValue] = useState<IOldValue>({} as IOldValue);

        async function setNewValue(value: string) {
          switch (oldValue.type) {
            case "name":
              return await UserStore.updateUserName(value);
            case "mobileNumber":
              return await UserStore.updateMobileNumber(value);
            case "businessName":
              return await UserStore.updateBusinessName(value);
            default:
              return "";
          }
        }

        return (
          <Screen>
            <StatusBar backgroundColor={Colors.primaryBlue}></StatusBar>
            <HeaderWithIconText
              icon={"arrow-left"}
              text={UserStore.user.businessName}
              handleIconPress={() => { navigation.goBack()}}
              bold
            ></HeaderWithIconText>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
            >
              <TextWithIcon
                text="Personal Info"
                icon={
                  <AntDesign
                    name="profile"
                    size={24}
                    color={Colors.secondaryGray}
                  />
                }
                color={Colors.secondaryGray}
              />

              <DataWithIconAndEdit
                icon={
                  <Ionicons
                    name="person-outline"
                    size={24}
                    color={Colors.primaryText}
                  />
                }
                heading="Name"
                value={UserStore.user.name}
                onPress={() => {
                  setOldValue({ type: "name", value: UserStore.user.name });
                  refRBSheet.current.open();
                }}
              />
              <DataWithIconAndEdit
                icon={
                  <Feather name="phone" size={24} color={Colors.primaryText} />
                }
                heading="Mobile Number"
                value={UserStore.user.mobileNumber}
                onPress={() => {
                  setOldValue({
                    type: "mobileNumber",
                    value: UserStore.user.mobileNumber,
                  });
                  refRBSheet.current.open();
                }}
              />
              <DataWithIconAndEdit
                icon={
                  <MaterialCommunityIcons
                    name={"notebook"}
                    size={24}
                    color={Colors.primaryText}
                  />
                }
                heading="Business Name"
                value={UserStore.user.businessName}
                onPress={() => {
                  setOldValue({
                    type: "businessName",
                    value: UserStore.user.businessName,
                  });
                  refRBSheet.current.open();
                }}
              />

              <TextWithIcon
                text="Settings"
                icon={
                  <AntDesign
                    name="setting"
                    size={24}
                    color={Colors.secondaryGray}
                  />
                }
                color={Colors.secondaryGray}
              />

              <DataWithIconAndEdit
                icon={<MaterialIcons name="backup" size={24} color="black" />}
                heading="Backup Information"
                editable={false}
              />

              <DataWithIconAndEdit
                icon={<MaterialIcons name="delete" size={24} color="black" />}
                heading="Delete data"
                editable={false}
              />
              <TextWithIcon
                text="Help and Support"
                icon={
                  <Feather
                    name="help-circle"
                    size={24}
                    color={Colors.secondaryGray}
                  />
                }
                color={Colors.secondaryGray}
              />
              <DataWithIconAndEdit
                icon={<MaterialIcons name="email" size={24} color="black" />}
                heading="Email us"
                value="dcollection@gmail.com"
                editable={false}
              />
            </ScrollView>
            <EditModal
              oldValue={oldValue.value}
              getNewValue={setNewValue}
              refRBSheet={refRBSheet}
              mobileNumber={oldValue.type=="mobileNumber" ? true : false}
            ></EditModal>
          </Screen>
        );
      }}
    </Observer>
  );
}
