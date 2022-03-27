import * as SQLite from "expo-sqlite";
import { SESSION_DATA } from "../common/utils";

const Database = {
  getConnection: () => {
    const db = SQLite.openDatabase("localStorage.db");

    db.transaction((tx) => {
      tx.executeSql(
        `create table if not exists ${SESSION_DATA.PROFILE} (id INTEGER PRIMARY KEY AUTOINCREMENT, ${SESSION_DATA.RESULT} text not null, ${SESSION_DATA.TOKEN} text not null)`
      );
    });
    const ExecuteQuery = (sql: string, params: string[] = []) =>
      new Promise((resolve, reject) => {
        db.transaction((trans) => {
          trans.executeSql(
            sql,
            params,
            (_, results) => {
              resolve(results);
            },
            (error, message) => {
              console.error(message);
              reject(message);
            }
          );
        });
      });
    return ExecuteQuery;
  },
};

export default Database;
