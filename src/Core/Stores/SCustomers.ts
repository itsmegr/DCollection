import {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
  configure,
  computed,
} from "mobx";
import { MCustomer, MEntry } from "../Models/Index";
import { ICustomerData, IDashBoardData } from "./Index";

configure({
  enforceActions: "always",
});

//Change the data in store when
export default class SCustomers {
  @observable customers: MCustomer[] = [];
  @observable entries: MEntry[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action
  fetchData = async () => {
    //fetch customers and entries
  };

  @action
  fetchCustomers = async () => {
    //fetch customers
  };

  @action
  addCustomer = async () => {};

  @action
  updateCustomer = async () => {};

  @action
  deleteCustomer = async () => {};

  @action
  fetchEntries = async () => {};

  @action
  addEntry = async () => {};

  @action
  updateEntry = async () => {};

  @action
  deleteEntry = async () => {};

  @computed
  getDashBoardData = (): IDashBoardData => {
    return {} as IDashBoardData;
  };

  @computed
  getCustomerData = (): ICustomerData => {
    return {} as ICustomerData;
  };
}
