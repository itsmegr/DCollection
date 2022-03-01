import {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
  configure,
  computed,
  runInAction,
} from "mobx";
import getLatestTimestamp from "../../Helpers/GetLatestTimestamp";

import { MCustomer, MEntry } from "../Models/Index";
import { RCustomers } from "../Repositories/RCustomers";
import { ICustomerData, ICustomerSummary, IDashBoardData } from "./Index";

//Change the data in store when
export default class SCustomers {
  customers: MCustomer[] = [];
  entries: MEntry[] = [];

  constructor(private customersRepo: RCustomers) {
    makeObservable(this, {
      customers: observable,
      entries: observable,
      fetchData: action,
      fetchCustomers: action,
      fetchEntries: action,
      dashBoardData: computed,
    });
  }

  async fetchData() {
    //fetch customers and entries
    await this.fetchCustomers();
    await this.fetchEntries();
  }

  async fetchCustomers() {
    //fetch customers
    let res = await this.customersRepo.getCustomers();
    runInAction(() => {
      this.customers = res;
    });
  }

  async addCustomer(value : MCustomer) {
    console.log("Data added", value);
    
    this.customersRepo.addCustomer(value);
  }

  async updateCustomer() {}

  async deleteCustomer() {}

  async fetchEntries() {
    let res = await this.customersRepo.getEntries();
    runInAction(() => {
      this.entries = res;
    });
  }

  async addEntry() {}

  async updateEntry() {}

  async deleteEntry() {}


  get dashBoardData(): IDashBoardData {
    /*
      totalGiven: number;
      totalCollected: number;
      customers: ICustomerSummary[];
    */
    let totalGiven = 0,
      totalCollected = 0;
    let dict: { [name: number]: ICustomerSummary } = {};

    for (let entry of this.entries) {
      if (!dict[entry.customerId]) {
        //first entry for that customer
        let customerName: string;
        const ind = this.customers.findIndex(
          (ele) => ele.id === entry.customerId
        );
        if (ind < 0) continue;

        customerName = this.customers[ind].name;

        dict[entry.customerId] = {
          customerId: entry.customerId,
          customerName: customerName,
          lastEntryTimeStamp: entry.timeStamp,
          totalCollected: entry.type === "collected" ? entry.amount : 0,
          totalGiven:
            entry.type === "given" || entry.type === "penalty"
              ? entry.amount
              : 0,
        };
      } else {
        //has already entries
        dict[entry.customerId].lastEntryTimeStamp = getLatestTimestamp(
          dict[entry.customerId].lastEntryTimeStamp,
          entry.timeStamp
        );
        if (entry.type === "collected") {
          dict[entry.customerId].totalCollected += entry.amount;
        } else {
          dict[entry.customerId].totalGiven += entry.amount;
        }
      }
      if (entry.type === "collected") {
        totalCollected += entry.amount;
      } else {
        totalGiven += entry.amount;
      }
    }

    let customers: ICustomerSummary[] = [];
    for (const [key, value] of Object.entries(dict)) {
      customers.push(value);
    }

    customers = customers.sort(
      (a, b) => a.lastEntryTimeStamp.getTime() - b.lastEntryTimeStamp.getTime()
    );

    return {
      totalGiven: totalGiven,
      totalCollected: totalCollected,
      customers: customers,
    };
  }

  get customerData(): ICustomerData {
    return {} as ICustomerData;
  }
}
