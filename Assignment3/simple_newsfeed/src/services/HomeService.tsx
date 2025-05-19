import React from 'react'
import axios from "axios";
import type { CreateComment, CreatePost, PostGet, UserDataGet } from '../models/Home';
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


export const createPostApi = async (
  text: string,
) => {
  try {
    const token = localStorage.getItem("token");
    const data = await axios.post<CreatePost>(api + "/feed/post", {
      text: text
    }, {
      headers: {
        Authorization: `${token}`
      }
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};



export const createCommentApi = async(text: string, postId: string)=>{
    try {
    const token = localStorage.getItem("token");
    const data = await axios.post<CreateComment>(api + `feed/${postId}/comment`, {
      // POST_ID: `${postId}`,
      POST_ID: postId,

      text: text
    }, {
      headers: {
        // Authorization: `${token}`
        Authorization: token

      }
    });
    return data;
  } catch (error) {
    handleError(error);
  }
  };

