import jwtDecode from "jwt-decode";
import { ResultSet, SQLResultSet } from "expo-sqlite";
import Database from "./dbServices";
import { SESSION_DATA } from "../common/utils";

const DB_EXEC = Database.getConnection();

export async function getLoggedInUser(): Promise<UserObject> {
  const results = (await DB_EXEC(
    `select * from ${SESSION_DATA.PROFILE}`
  )) as SQLResultSet;
  const userObject = results.rows._array[0];
  if (userObject?.result) userObject.result = JSON.parse(userObject?.result);
  return userObject;
}

export const setLoggedInUser = async (param: UserObject | null) => {
  if (!param) return;
  // there should only be one user logged in
  await DB_EXEC(`delete from ${SESSION_DATA.PROFILE}`);
  let results;
  try {
    results = (await DB_EXEC(
      `insert into ${SESSION_DATA.PROFILE} (${SESSION_DATA.RESULT}, ${SESSION_DATA.TOKEN})
        values (?,?)`,
      [JSON.stringify(param.result), param.token]
    )) as ResultSet;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("setLoggedInUser error", error);
  }
  // eslint-disable-next-line no-console
  console.log(results?.rowsAffected);
};

export const logOutUser = async () => {
  (await DB_EXEC(`delete from ${SESSION_DATA.PROFILE}`)) as ResultSet;
  //   console.log(results?.rowsAffected);
};

interface IDecodedToken {
  name: string;
  exp: number;
}

export async function checkIfTokenIsExpired(): Promise<boolean> {
  const user = await getLoggedInUser();
  if (!user?.token) return true;

  const decodedToken = jwtDecode<IDecodedToken>(user.token);
  const timeNowInMilisseconds = new Date().getTime();
  const tokenExpireDateInMilisseconds = decodedToken.exp * 1000;
  if (tokenExpireDateInMilisseconds < timeNowInMilisseconds) return true;
  return false;
}
