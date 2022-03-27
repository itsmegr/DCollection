import { NavigatorScreenParams } from "@react-navigation/native";
import { MCustomer, MEntry } from "../Core/Models/Index";

export type RootStackParamList = {
  GetStarted: undefined;
  Dashboard: undefined;
  Settings: undefined;
  CustomerEntries: { customerId: number };
  AddCustomer: undefined;
  CustomerProfile: { customerId: number };
  EntryForm: {
    customerId: number;
    type: "given" | "collected" | "penalty";
    edit: boolean;
    prevEntry: MEntry;
  };
  EntryDetail: {
    entry: MEntry;
    customer: MCustomer;
    totalCollected: number;
    totalGiven: number;
  };
};
