import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect } from "react";
import { MockCustomerRepo } from "./src/Core/Repositories/RCustomers";
import { MockUserRepo } from "./src/Core/Repositories/RUser";
import SCustomers from "./src/Core/Stores/SCustomers";
import SUser from "./src/Core/Stores/SUser";
import { RootStackParamList } from "./src/Navigation/types";
import Dashboard from "./src/Pages/Dashboard/Index";
import GetStarted from "./src/Pages/GetStarted/Index";
import Settings from "./src/Pages/Settings/Index";
import { StoresContext } from "./src/Providers/StoresProvider";

import CustomerEntries from "./src/Pages/CustomerEntries/Index";
import AddCustomer from "./src/Pages/AddCustomer/Index";
import CustomerProfile from "./src/Pages/CustomerProfile/Index";

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  async function askPermissions() {
    await MediaLibrary.requestPermissionsAsync();
  }
  const isFirstTime = false;

  useEffect(() => {
    askPermissions();
  }, []);

  return (
    <NavigationContainer>
      <StoresContext.Provider
        value={{
          CustomersStore: new SCustomers(new MockCustomerRepo()),
          UserStore: new SUser(new MockUserRepo()),
        }}
      >
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          {isFirstTime && (
            <RootStack.Screen name="GetStarted" component={GetStarted} />
          )}
          <RootStack.Screen name="Dashboard" component={Dashboard} />
          <RootStack.Screen name="Settings" component={Settings} />
          <RootStack.Screen
            name="CustomerEntries"
            component={CustomerEntries}
          />
          <RootStack.Screen name="AddCustomer" component={AddCustomer} />
          <RootStack.Screen name="CustomerProfile" component={CustomerProfile} />
        </RootStack.Navigator>
      </StoresContext.Provider>
    </NavigationContainer>
  );
}
