import React from 'react'
import axios from "axios";
import type { PostGet, UserDataGet } from '../models/Home';
import { handleError } from "../helpers/ErrorHandler";

const api = "https://us-central1-bluefletch-learning-assignment.cloudfunctions.net/";

export const userDataGetApi = async () => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get<UserDataGet>(api + 'user', {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const postGetApi = async () => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.get<PostGet[]>(api + 'feed?limit=9999999', {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};