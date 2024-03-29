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
  isLoading: boolean = true;

  constructor(private customersRepo: RCustomers) {
    makeObservable(this, {
      customers: observable,
      entries: observable,
      isLoading: observable,
      fetchData: action,
      fetchCustomers: action,
      fetchEntries: action,
      dashBoardData: computed,
      updateCustomer: action,
      deleteCustomer: action,
      deleteEntry: action,
    });
    this.isLoading = true;
    this.fetchData();
  }

  async fetchData() {
    //fetch customers and entries
    await this.fetchCustomers();
    await this.fetchEntries();

    runInAction(() => {
      this.isLoading = false;
    });
  }

  async fetchCustomers() {
    //fetch customers
    let res = await this.customersRepo.getCustomers();
    runInAction(() => {
      this.customers = res;
    });
  }

  async addCustomer(value: MCustomer) {
    this.customersRepo.addCustomer(value);
    await this.fetchCustomers();
  }

  //this returns the data for customer summary
  getCustomerData(id: number): ICustomerData {
    /*
        customer : MCustomer;
        totalGiven : number;
        totalCollected : number;
        entries : MEntry[]
      */
    let customer: MCustomer = {} as MCustomer;
    let totalGiven = 0,
      totalCollected = 0;
    let customerEntries: MEntry[] = [];
    for (let element of this.customers) {
      if (element.id === id) {
        customer = element;
        break;
      }
    }

    for (let entry of this.entries) {
      if (entry.customerId === id) {
        customerEntries.push(entry);
        if (entry.type === "collected") {
          totalCollected += entry.amount;
        } else {
          totalGiven += entry.amount;
        }
      }
    }

    customerEntries = customerEntries.sort(
      (a, b) => b.timeStamp.getTime() - a.timeStamp.getTime()
    );
    let res = {
      customer: customer,
      totalGiven: totalGiven,
      totalCollected: totalCollected,
      entries: customerEntries,
    };

    return res;
  }

  getCustomerProfile(id: number): MCustomer {
    let cus: MCustomer = {} as MCustomer;
    for (let customer of this.customers) {
      if (customer.id === id) return customer;
    }

    return cus;
  }

  async updateCustomer(id: number, value: MCustomer) {
    await this.customersRepo.updateCustomer(id, value);
    await this.fetchCustomers();
  }

  async deleteCustomer(id: number) {
    await this.customersRepo.deleteCustomer(id);
    await this.fetchEntries();
    await this.fetchCustomers();
  }

  async fetchEntries() {
    let res = await this.customersRepo.getEntries();
    runInAction(() => {
      this.entries = res;
    });
  }

  async addEntry(value: MEntry) {
    await this.customersRepo.addEntry(value);
    await this.fetchEntries();
  }

  async updateEntry(id: number, value: MEntry) {
    await this.customersRepo.updateEntry(id, value);
    await this.fetchEntries();
  }

  async deleteEntry(id: number) {
    await this.customersRepo.deleteEntry(id);
    await this.fetchEntries();
  }

  get dashBoardData(): IDashBoardData {
    /*
      totalGiven: number;
      totalCollected: number;
      customers: ICustomerSummary[];
    */
    let totalGiven = 0,
      totalCollected = 0;
    let dict: { [name: number]: ICustomerSummary } = {};

    for (let customer of this.customers) {
      dict[customer.id] = {
        customerId: customer.id,
        customerName: customer.name,
        lastEntryTimeStamp: customer.createdAt,
        totalCollected: 0,
        totalGiven: 0,
      };
    }

    for (let entry of this.entries) {
      // if (!dict[entry.customerId]) continue;
      dict[entry.customerId].lastEntryTimeStamp = getLatestTimestamp(
        dict[entry.customerId].lastEntryTimeStamp,
        entry.timeStamp
      );
      if (entry.type === "collected") {
        dict[entry.customerId].totalCollected += entry.amount;
      } else {
        dict[entry.customerId].totalGiven += entry.amount;
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
      (a, b) => b.lastEntryTimeStamp.getTime() - a.lastEntryTimeStamp.getTime()
    );

    return {
      totalGiven: totalGiven,
      totalCollected: totalCollected,
      customers: customers,
    };
  }
}
