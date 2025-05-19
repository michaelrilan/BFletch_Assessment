import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import type { UserProfileToken } from "../models/User";
const api = "https://us-central1-bluefletch-learning-assignment.cloudfunctions.net/";


export const loginAPI = async (username: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/login", {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};


// export const logoutAPI = async () => {
//   try {
//     const res = await axios.post(api + "account/logout", {});
//     if (res.status === 202) {
//       return true;
//     } else {
//       throw new Error("Logout failed");
//     }
//   } catch (error) {
//     handleError(error);
//     return false;
//   }
// };
export const registerAPI = async (
  username: string,
  password: string,
  firstname: string,
  lastname: string
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "account/create", {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};