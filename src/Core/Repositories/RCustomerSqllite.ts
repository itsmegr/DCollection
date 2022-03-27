import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { IUpdateCustomerArgs, IUpdateEntryArgs, RCustomers } from "./RCustomers";
import { MCustomer, MEntry } from "../Models/Index";
import {
  ResultSet,
  ResultSetError,
  SQLError,
  SQLTransaction,
} from "expo-sqlite";
import { execute, migrateDB, openDatabase } from "../Utils/SqlliteUtils";
import { insert } from "formik";


export class CustomerRepo implements RCustomers {
  db: SQLite.WebSQLDatabase;
  constructor(db: SQLite.WebSQLDatabase) {
    this.db = db;
    //getting the all the data from db
  }

  async addCustomer(value: MCustomer): Promise<void> {
    let { data } = await execute<void>(
      this.db,
      `insert into customers (name, mobile_number, address, guarantor_name, guarantor_mobile_number, created_at)
      values (?, ?, ?, ?, ?, ?);`,
      [
        value.name,
        value.mobileNumber,
        value.address,
        value.guarantorName,
        value.guarantorMobileNumber,
        value.createdAt.toISOString(),
      ]
    );
    console.log("Customer inserted");
    return data;
  }

  //getting all the customers
  async getCustomers(): Promise<MCustomer[]> {
    let { data } = await execute<MCustomer[]>(
      this.db,
      `SELECT 
       id,
       name,
       mobile_number as mobileNumber,
       address,
       guarantor_name as guarantorName,
       guarantor_mobile_number as guarantorMobileNumber,
       created_at as createdAt
       FROM customers;`,
      []
    );

    data.forEach((cust) => {
      cust.createdAt = new Date(cust.createdAt);
    });
    return data;
  }

  async updateCustomer(
    id: number,
    newValue: IUpdateCustomerArgs
  ): Promise<void> {
    console.log("new upadted values are ", newValue);

    let { data } = await execute<void>(
      this.db,
      `UPDATE 
        customers
      SET 
        name = ?,
        mobile_number = ?,
        address = ?,
        guarantor_name = ?,
        guarantor_mobile_number = ?
      WHERE
        id=?; 
      `,
      [
        newValue.name,
        newValue.mobileNumber,
        newValue.address,
        newValue.guarantorName,
        newValue.guarantorMobileNumber,
        id,
      ]
    );

    return data;
  }

  async deleteCustomer(id: number): Promise<void> {
    let { data } = await execute<void>(
      this.db,
      `DELETE FROM customers
      WHERE
        id = ?`,
      [id]
    );

    console.log("Customer deleted");
    return data;
  }

  //here starts all the code for entries
  async addEntry(value: MEntry): Promise<void> {
    try {
      let { data, insertId } = await execute<void>(
        this.db,
        `insert into entries 
      (
        customer_id, 
        type, 
        amount,
        description, 
        timestmp
      )
      values (?, ?, ?, ?, ?);
      `,
        [
          value.customerId,
          value.type,
          value.amount,
          value.desc,
          value.timeStamp.toISOString(),
        ]
      );
      // var x = this.db.last;

      //here we also need to add bills for that
      console.log("Entry inserted id is ", insertId);

      //now add bills
      for (const bill of value.bills) {
        if (insertId) await this.addBill(insertId, bill);
      }
      console.log("Bills added");

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async addBill(entryId: number, uri: string) {
    //add the bill
    await execute(
      this.db,
      `
        INSERT INTO bills
        (
          entry_id,
          uri
        )
        VALUES
        (
          ?, ?
        );
      `,
      [entryId, uri]
    );
    return;
  }
  async deleteBillsOfEntry(entryId: number) {
    //add the bill
    await execute(
      this.db,
      `
        DELETE FROM bills
        WHERE entry_id=?;
      `,
      [entryId]
    );
    return;
  }

  async getEntries(): Promise<MEntry[]> {
    let obj1 = await execute<MEntry[]>(
      this.db,
      `SELECT 
        id,
        customer_id as customerId,
        type,
        amount, 
        description as desc,
        timestmp as timeStamp
       FROM entries;
      `,
      []
    );
    let entries: MEntry[], bills: { entryId: number; uri: string }[];

    let obj2 = await execute<{ entryId: number; uri: string }[]>(
      this.db,
      `SELECT 
        entry_id as entryId,
        uri
       FROM bills;
      `,
      []
    );
    entries = obj1.data;
    bills = obj2.data;

    entries.forEach((entry) => {
      entry.timeStamp = new Date(entry.timeStamp);
      entry.bills = [];

      bills.forEach((bill) => {
        if (bill.entryId === entry.id) entry.bills.push(bill.uri);
      });
    });

    return entries;
  }

  //update entry
  async updateEntry(id: number, newValue: IUpdateEntryArgs) {
    //her simple way is delete all the bills with that entry id and insert new ones
    //deleting all the bills of that entry
    await this.deleteBillsOfEntry(id);

    //updating the entry
    await execute(
      this.db,
      `
      UPDATE entries
      SET 
        amount=?,
        timestmp=?,
        description=?
      WHERE id=?;
    `,
      [newValue.amount, newValue.timeStamp?.toISOString(), newValue.desc, id]
    );
    console.log("Entry updated");

    //adding all the bills
    for (const bill of newValue.bills) {
      await this.addBill(id, bill);
    }
    console.log("Bills updated");
  }

  //delete entry
  async deleteEntry(id: number): Promise<void> {
    await execute(
      this.db,
      `
      DELETE FROM entries
      WHERE id = ?;
    `,
      [id]
    );
  }
}

async function check() {
  let db = await openDatabase();
  await migrateDB(db);

  let obj1 = new CustomerRepo(db);

  // await obj1.addCustomer({
  //   id: 132,
  //   name: "govind",
  //   mobileNumber: "12334",
  //   address: "2125tretryh",
  //   guarantorName: "123r",
  //   guarantorMobileNumber: "324356",
  //   createdAt: new Date(),
  // });
  obj1.deleteCustomer(1);
  let data1 = await obj1.getCustomers();
  console.log("customers", data1);

  // await obj1.addEntry({
  //   id: 123,
  //   amount: 1243,
  //   bills: ["govind", "rathore", "This is new ", "and this is me"],
  //   type: "collected",
  //   customerId: 1,
  //   desc: "this is fdor mew",
  //   timeStamp: new Date(),
  // });
  // let data = await obj1.getEntries();
  // console.log("entry data ", data);

  // data = await obj1.getCustomers();
  // console.log("New customers", data);

  let data = await obj1.getEntries();
  console.log("entries ", data);
}

// check();
//
