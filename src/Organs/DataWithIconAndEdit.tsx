import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import Colors from "../Constants/Colors";
import IconWrapper from "../Atoms/IconWrapper";

interface props {
  icon?: JSX.Element;
  heading?: string;
  value?: string;
  editable ?: boolean
  onPress ?: () => void;
}

export default function DataWithIconAndEdit({ icon, heading, value,editable, onPress }: props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: Colors.white,
          padding: 10,
          height: 60,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconWrapper icon={icon} />
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                color:
                  value != undefined && value != ""
                    ? Colors.secondaryGray
                    : Colors.primaryText,
                fontSize: value != undefined && value != "" ? 14 : 16,
              }}
            >
              {heading}
            </Text>
            {value != undefined && value != "" && (
              <Text style={{ fontSize: 16 }}>{value}</Text>
            )}
          </View>
        </View>
        {editable!=false && <Feather name="edit" size={18} color={Colors.secondaryGray} />}
      </View>
    </TouchableOpacity>
  );
}
