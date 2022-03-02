import React from 'react'
import { View, Text, Modal, ActivityIndicator, StatusBar } from 'react-native'

interface props {
    isModalVisible: boolean
}

export default function ActivityLoaderModal({ isModalVisible }: props) {
  return (
    <Modal visible={isModalVisible} animationType="none" transparent={true}>
      <StatusBar backgroundColor={"rgba(242, 242, 242, 0.4)"}></StatusBar>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-around",
          flex: 1,
          backgroundColor: "rgba(242, 242, 242, 0.4)",
        }}
      >
        <ActivityIndicator size="large" color="red" />
      </View>
    </Modal>
  );
}
