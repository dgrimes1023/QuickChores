import React, { createContext, use, useContext, useEffect, useState } from "react";
import axios from "axios";
import { get } from "http";

const GlobalContext = createContext();

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const GlobalContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth0User, setAuth0User] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/check-auth");
        console.log("Check auth", res.data);
        setIsAuthenticated(res.data.isAuthenticated);
        setAuth0User(res.data.user);
        setLoading(false);
      } catch (error) {
        console.log("Error checking auth", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const getUserProfile = async (id) => {
    try {
      const res = await axios.get(`/api/v1/user/${id}`);

      setUserProfile(res.data);
    } catch (error) {
      console.log("Error getting user profile", error);
    }
  };

  useEffect(() => {
    if(isAuthenticated && auth0User){
    getUserProfile(auth0User.sub);
    }
    }, [isAuthenticated, auth0User]);

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        auth0User,
        userProfile,
        loading,
        getUserProfile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
