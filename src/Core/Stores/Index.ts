import { configure } from "mobx";
import { MCustomer, MEntry } from "../Models/Index";
import SCustomers from "./SCustomers";
import SUser from "./SUser";

// configure({
//   enforceActions: "always",
// });

export interface ICustomerSummary {
  customerId: number;
  customerName: string;
  lastEntryTimeStamp: Date;
  totalGiven: number;
  totalCollected: number;
}

export interface IDashBoardData {
  totalGiven: number;
  totalCollected: number;
  customers: ICustomerSummary[];
}


export interface ICustomerData {
  customer: MCustomer;
  totalGiven: number;
  totalCollected: number;
  entries: MEntry[];
}

export interface IAppStore {
    CustomersStore : SCustomers;
    UserStore : SUser;
}


