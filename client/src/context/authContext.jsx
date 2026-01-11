import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userType,setUserType] = useState("");

  const authVerify = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/users/verify", {
        withCredentials: true,
      });
      if(resp.data.status){
        console.log(resp);
        setIsLoggedIn(true);
        setUser(resp.data.user);
        setUserType(resp.data.userType);
      }
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
      setUser(null);
    }finally{
      setLoading(false);
    }
  };
  
  useEffect(() => {
    authVerify();
  }, []);

  const loginSuccess = async () => {
    await authVerify();
  };

  const logoutSuccess = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loginSuccess, logoutSuccess, loading, userType}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {return useContext(AuthContext)}
