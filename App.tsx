import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Text } from "react-native";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import { MockCustomerRepo } from "./src/Core/Repositories/RCustomers";
import { MockUserRepo } from "./src/Core/Repositories/RUser";
import SCustomers from "./src/Core/Stores/SCustomers";
import SUser from "./src/Core/Stores/SUser";
import { RootStackParamList } from "./src/Navigation/types";
import Dashboard from "./src/Pages/Dashboard/Index";
import GetStarted from "./src/Pages/GetStarted/Index";
import Settings from "./src/Pages/Settings/Index";
import { StoresContext } from "./src/Providers/StoresProvider";
import * as SQLite from "expo-sqlite";
import CustomerEntries from "./src/Pages/CustomerEntries/Index";
import AddCustomer from "./src/Pages/AddCustomer/Index";
import CustomerProfile from "./src/Pages/CustomerProfile/Index";
import EntryForm from "./src/Pages/EntryForm/Index";
import EntryDetail from "./src/Pages/EntryDetail/Index";
import ActivityLoaderModal from "./src/Atoms/ActivityLoaderModal";
import { migrateDB, openDatabase } from "./src/Core/Utils/SqlliteUtils";
import { CustomerRepo } from "./src/Core/Repositories/RCustomerSqllite";
import { UserRepo } from "./src/Core/Repositories/RUserSqllite";
import CheckAnimation from "./src/Pages/CheckAnimation/Index";
import { getIsFirstTime } from "./src/Core/Utils/AsyncStorage";

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [db, setDB] = useState<null | SQLite.WebSQLDatabase>(null);
  const [isFirstTime, setIsFirstTime] = useState<boolean | undefined>(
    undefined
  );

  async function askPermissions() {
    try {
      await MediaLibrary.requestPermissionsAsync();
    } catch (error) {}
  }

  async function loadingDependencies() {
    try {
      let data1 = await getIsFirstTime();
      setIsFirstTime(data1);
      let db = await openDatabase();
      await migrateDB(db);
      setDB(db);
    } catch (error) {}
  }

  //this is for starting Db
  useEffect(() => {
    loadingDependencies();
    askPermissions();
  }, []);

  if (!db) {
    return <ActivityLoaderModal isModalVisible={true} />;
  }
  return (
    <NavigationContainer>
      <StoresContext.Provider
        value={{
          CustomersStore: new SCustomers(new CustomerRepo(db)),
          UserStore: new SUser(new UserRepo(db)),
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
          <RootStack.Screen
            name="CustomerProfile"
            component={CustomerProfile}
          />
          <RootStack.Screen name="EntryForm" component={EntryForm} />
          <RootStack.Screen name="EntryDetail" component={EntryDetail} />
          <RootStack.Screen name="CheckAnimation" component={CheckAnimation} />
        </RootStack.Navigator>
      </StoresContext.Provider>
    </NavigationContainer>
  );
}
