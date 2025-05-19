import React from 'react'
import axios from "axios";
import type { UpdateProfilePic } from '../models/UpdateProfile';
import { handleError } from '../helpers/ErrorHandler';
const api = "https://us-central1-bluefletch-learning-assignment.cloudfunctions.net/";


export const updateProfileApi = async (
  profileImage: File,  // receive File object, not string
) => {
  try {
    console.log(profileImage);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("profileImage", profileImage);

    const data = await axios.post<UpdateProfilePic>(api + "/user/picture", formData, {
      headers: {
        Authorization: `${token}`,
        // 'Content-Type' will be set automatically to multipart/form-data by Axios
      },
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};
