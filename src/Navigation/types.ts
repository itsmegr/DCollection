import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  GetStarted: undefined;
  Dashboard: undefined;
  Settings: undefined;
  CustomerEntries: { customerId: number };
  AddCustomer: undefined;
  CustomerProfile: { customerId: number };
};
