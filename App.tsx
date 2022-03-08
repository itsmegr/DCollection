import React, { useEffect } from "react";
import Screen from "./src/Atoms/Screen";
import { MockCustomerRepo } from "./src/Core/Repositories/RCustomers";
import { MockUserRepo } from "./src/Core/Repositories/RUser";
import SCustomers from "./src/Core/Stores/SCustomers";
import SUser from "./src/Core/Stores/SUser";
import Dashboard from "./src/Pages/Dashboard/Index";
import GetStarted from "./src/Pages/GetStarted/Index";
import { StoresContext } from "./src/Providers/StoresProvider";
import {Text} from "react-native"
import AddCustomer from "./src/Pages/AddCustomer/Index";
import CustomerEntries from "./src/Pages/CustomerEntries/Index"
import EntryForm from "./src/Pages/EntryForm/Index";
import EntryDetail from "./src/Pages/EntryDetail/Index";
import * as MediaLibrary from "expo-media-library";


export default function App() {
  async function askPermissions(){
    await MediaLibrary.requestPermissionsAsync();
  }

  useEffect(()=>{
    askPermissions()
  }, [])

  return (
    <StoresContext.Provider
      value={{
        CustomersStore: new SCustomers(new MockCustomerRepo()),
        UserStore: new SUser(new MockUserRepo()),
      }}
    >
      <EntryDetail/>
    </StoresContext.Provider>
  );
}
