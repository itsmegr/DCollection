import {
  ResultSet,
  ResultSetError,
  SQLError,
  SQLTransaction,
} from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

export async function openDatabase(): Promise<SQLite.WebSQLDatabase> {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }

  let dbFile = await FileSystem.getInfoAsync(
    FileSystem.documentDirectory + "SQLite/main-db.db"
  );

  if (!dbFile.exists) {
    //here create a new one
    // await FileSystem.downloadAsync(
    //   "http://192.168.0.101:3100/download/db.db",
    //   FileSystem.documentDirectory + "SQLite/main-db.db"
    // );
    console.log("DB file does not exists, new will created");
  } else {
    // console.log("Exists deleting it")
    // FileSystem.deleteAsync(dbFile.uri)
  }

  return SQLite.openDatabase("main-db.db");
}

//implementing migration db
export async function migrateDB(db: SQLite.WebSQLDatabase): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await db.exec(
        [{ sql: "PRAGMA foreign_keys = ON;", args: [] }],
        false,
        (error, resultSet) => {}
      );
      await db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS customers
           (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
            name TEXT NOT NULL, mobile_number TEXT NOT NULL, 
            address TEXT, 
            guarantor_name TEXT NOT NULL, 
            guarantor_mobile_number TEXT NOT NULL, 
            created_at TEXT NOT NULL
            ); 
            `
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS entries 
          (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , 
            customer_id INTEGER, 
            type TEXT, 
            amount INTEGER, 
            description TEXT, 
            timestmp TEXT, 
            FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
            );
            `
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS bills 
          (
            entry_id INTEGER NOT NULL, 
            uri TEXT NOT NULL, 
            FOREIGN KEY (entry_id) REFERENCES entries (id) ON DELETE CASCADE
            );
            `
        );

        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS user 
          (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , 
            name TEXT,
            mobile_number TEXT,
            business_name TEXT 
            );
            `
        );
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

export async function execute<T>(
  _db: SQLite.WebSQLDatabase,
  sqlStatement: string,
  args: any = []
): Promise<{ data: T; insertId: number | undefined }> {
  return new Promise((resolve, reject) => {
    try {
      _db.transaction((tx) => {
        tx.executeSql(
          sqlStatement,
          args,
          (txObj, { rows: { _array }, insertId }) => {
            resolve({ data: _array as unknown as T, insertId: insertId });
          },

          (txObj, error): boolean => {
            reject(error);
            return false;
          }
        ); // end executeSQL
      });
    } catch (error) {
      reject(error);
    }
  });
}
