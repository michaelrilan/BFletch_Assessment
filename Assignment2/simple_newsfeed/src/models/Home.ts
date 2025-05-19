export type UserDataGet = {
    username: string;
    firstName: string;
    lastName: string;
    profilePic: string;
}



// export type PostGet = {
//   comments?: any;
//   createdAt: string;
//   id: string;
//   text: string;
//   updatedAt: string;
//   user: any;
// }

export type User = {
  username: string;
  firstName: string;
  lastName: string;
  profilePic: string;
}

export type Comment = {
  id: number | string;
  text: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  timestamp: number;
}

export type PostGet = {
  comments?: Comment[];
  createdAt: string;
  id: string;
  text: string;
  updatedAt: string;
  user: User;
}