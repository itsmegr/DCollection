import { MUser } from "../Models/Index";
import { execute } from "../Utils/SqlliteUtils";
import { RUser } from "./RUser";
import * as SQLite from "expo-sqlite";

export class UserRepo implements RUser {
  db: SQLite.WebSQLDatabase;
  constructor(db: SQLite.WebSQLDatabase) {
    this.db = db;
    //getting the all the data from db
  }
  async createUser(value: MUser): Promise<void> {
    let { data } = await execute<void>(
      this.db,
      `INSERT INTO user
          (
            name,
            mobile_number,
            business_name 
          )
          VALUES (?, ?, ?);
          `,
      [value.name, value.mobileNumber, value.businessName]
    );

    console.log("User created");
    return data;
  }
  async getUser(): Promise<MUser> {
    let { data } = await execute<MUser[]>(
      this.db,
      `SELECT 
            name,
            mobile_number as mobileNumber,
            business_name as businessName
        From user;
        `,
      []
    );
    if (data.length == 0) {
      console.log("No user is there, creating default");
      await execute(
        this.db,
        `
        insert into user 
        (
            name,
            mobile_number, 
            business_name
        )
        values (?, ?, ?);
      `,
        ["", "", "My Business"]
      );
    }

    //here getting it again
    let obj = await execute<MUser[]>(
      this.db,
      `SELECT 
            name,
            mobile_number as mobileNumber,
            business_name as businessName
        From user;
        `,
      []
    );

    return obj.data[0];
  }
  async updateName(value: string): Promise<void> {
    await execute(
      this.db,
      `
        UPDATE user
        SET
            name =?;
      `,
      [value]
    );
  }
  async updateMobileNumber(value: string): Promise<void> {
    await execute(
      this.db,
      `
        UPDATE user
        SET
            mobile_number =?;
      `,
      [value]
    );
  }
  async updateBusinessName(value: string): Promise<void> {
    await execute(
      this.db,
      `
        UPDATE user
        SET
            business_name =?;
      `,
      [value]
    );
  }
}
