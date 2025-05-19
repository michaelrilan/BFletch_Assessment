import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginAPI, registerAPI } from "../services/AuthService";
import { toast } from "react-toastify";


type UserContextType = {
  token: string | null;
  
  registerUser: (username: string, password: string, firstname: string, lastname: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
  loginUser: (username: string, password: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
  logOut: () => void;
  isLoggedIn: () => boolean;
};

type Props = {children: React.ReactNode;};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  //  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setLoading(true);
    try {
      const res = await registerAPI(username, password, firstname, lastname);
      if (res?.data.token) {
        localStorage.setItem("token", res?.data.token);
        setToken(res.data.token);
       
        toast.success("Sign Up Success!");
        navigate("/home");
      }else{
        toast.error("Invalid username and password provided.");
      }
    } catch (e) {
      toast.warning("Server error occurred");
    }  finally {
      setLoading(false); 
    }
  };

  const loginUser = async (username: string, password: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const res = await loginAPI(username, password);
      if (res?.data.token) {
        localStorage.setItem("token", res?.data.token);
        setToken(res.data.token);
        toast.success("Login Success!");
        setTimeout(() => navigate("/home"), 100);
      }else{
        toast.error("Invalid Credentials");
      }
    } catch (e) {
      toast.warning("Server error occurred");
    } finally {
      setLoading(false); 
    }
  };

  const logOut = async () => {
  try {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  } catch (e) {
    toast.warning("Server error occurred");
  }
};

  const isLoggedIn = () => {
    return !!token;
  };

  return (
    <UserContext.Provider
      value={{ token, loginUser, registerUser, logOut, isLoggedIn }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
