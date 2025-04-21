import React, {
  createContext,
  use,
  useContext,
  useState,
  useEffect,
} from "react";
import { useGlobalContext } from "./globalContext";
import axios from "axios";
import { get } from "http";
import toast from "react-hot-toast";

const ChoresContext = createContext();

export const ChoresContextProvider = ({ children }) => {
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.withCredentials = true;

  const { userProfile } = useGlobalContext();
  const [chores, setChores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userChores, setUserChores] = useState([]);

  const getChores = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/chores");
      setChores(res.data);
    } catch (error) {
      console.log("Error getting chores", error);
    } finally {
      setLoading(false);
    }
  };

  const createChore = async (choreData) => {
    try {
      const res = await axios.post("/api/v1/chores", choreData);

      toast.success("Chore created successfully");

      setChores((prevChores) => [res.data, ...prevChores]);

      // Update user chores
      if (userProfile._id) {
        setUserChores((prevChores) => [res.data, ...prevChores]);
      }
    } catch (error) {
      console.log("Error creating chore", error);
    }
  };

  const getUserChores = async (userId) => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/chores/user/" + userId);
      setUserChores(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error getting user chores", error);
    } finally {
      setLoading(false);
    }
  };

  const searchChores = async (tags, location, title) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();

      if (tags) query.append("tags", tags);
      if (location) query.append("location", location);
      if (title) query.append("title", title);

      // send the request

      const res = await axios.get(`/api/v1/chores/search?${query.toString()}`);

      // set the chores to the response data
      setChores(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error searching chores", error);
    } finally {
      setLoading(false);
    }
  };

  // get chore by id
  const getChoreById = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/chores/${id}`);

      setLoading(false);
      return res.data;
    } catch (error) {
      console.log("Error getting chore", error);
    } finally {
      setLoading(false);
    }
  };

  // like a chore
  const likeChore = async (choreId) => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/v1/chores/like/${choreId}`);
      getChores();
      toast.success("Chore liked successfully");
      setLoading(false);
      return res.data;
    } catch (error) {
      console.log("Error liking chore", error);
    } finally {
      setLoading(false);
    }
  };

  // apply to a chore
  const applyToChore = async (choreId) => {
    try {
      const res = await axios.put(`/api/v1/chores/apply/${choreId}`);
      toast.success("Applied to chore successfully");
      getChores();
    } catch (error) {
      console.log("Error applying to chore", error);
      toast.error(error.response.data.msg);
    }
  };

  // delete a chore
  const deleteChore = async (choreId) => {
    setLoading(true);
    try {
      await axios.delete(`/api/v1/chores/${choreId}`);
      setChores((prevChores) =>
        prevChores.filter((chore) => chore._id !== choreId)
      );
      searchChores((prevChores) =>
        prevChores.filter((chore) => chore._id !== choreId)
      );

      toast.success("Chore deleted successfully");
    } catch (error) {
      console.log("Error deleting chore", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChores();
  }, []);

  useEffect(() => {
    if (userProfile._id) {
      getUserChores(userProfile._id);
    }
  }, [userProfile]);

  return (
    <ChoresContext.Provider
      value={{
        chores,
        loading,
        createChore,
        userChores,
        searchChores,
        getChoreById,
        likeChore,
        applyToChore,
        deleteChore,
      }}
    >
      {children}
    </ChoresContext.Provider>
  );
};

export const useChoresContext = () => {
  return useContext(ChoresContext);
};
