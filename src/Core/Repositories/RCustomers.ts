import { MCustomer, MEntry } from "../Models/Index";
import { customers, entries } from "../MockData/Index";

interface IUpdateCustomerArgs {
  name?: string;
  mobileNumber?: string;
  address?: string;
  guarantorName?: string;
  guarantorMobileNumber?: string;
}

interface IUpdateEntryArgs {
  amount?: number;
  desc?: string;
  timeStamp?: Date;
  bills?: string[];
}

interface RCustomers {
  addCustomer: (value: MCustomer) => Promise<void>;
  getCustomers: () => Promise<MCustomer[]>;
  updateCustomer: (id: number, newValue: IUpdateCustomerArgs) => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;

  addEntry: (value: MEntry) => Promise<void>;
  getEntries: () => Promise<MEntry[]>;
  updateEntry: (id: number, newValue: IUpdateEntryArgs) => Promise<void>;
  deleteEntry: (id: number) => Promise<void>;
}

export class MockCustomerRepo implements RCustomers {
  mockCustomers = customers;
  mockEntries = entries
  async addCustomer(value: MCustomer) {
    this.mockCustomers.push(value);
  }
  async getCustomers() {
    return this.mockCustomers;
  }
  async updateCustomer(id: number, newValue: IUpdateCustomerArgs) {
    let ind = this.mockCustomers.findIndex((cust) => cust.id === id);
    if (ind === -1) return;

    if (newValue.name) this.mockCustomers[ind].name = newValue.name;
    if (newValue.mobileNumber)
      this.mockCustomers[ind].mobileNumber = newValue.mobileNumber;
    if (newValue.guarantorName)
      this.mockCustomers[ind].guarantorName = newValue.guarantorName;
    if (newValue.guarantorMobileNumber)
      this.mockCustomers[ind].guarantorMobileNumber =
        newValue.guarantorMobileNumber;
    if (newValue.address) this.mockCustomers[ind].address = newValue.address;

    return;
  }
  async deleteCustomer(id: number) {
    this.mockCustomers = this.mockCustomers.filter((cust) => cust.id !== id);
  }

  async addEntry (value: MEntry){
      this.mockEntries.push(value);
  }

  async getEntries () {
      return entries;
  }

  async updateEntry(id: number, newValue: IUpdateEntryArgs){
      let ind = this.mockEntries.findIndex((cust) => cust.id === id);
      if (ind === -1) return;

      if(newValue.amount) this.mockEntries[ind].amount = newValue.amount;
      if(newValue.desc) this.mockEntries[ind].desc = newValue.desc;
      if(newValue.timeStamp) this.mockEntries[ind].timeStamp = newValue.timeStamp;
      if(newValue.bills) this.mockEntries[ind].bills = newValue.bills;
  }

  async deleteEntry (id: number) {
      this.mockEntries = this.mockEntries.filter((ent) => ent.id!==id)
  }
}
