import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:3000/user";

const getUsers = async (username) => {
  try {
    const data = {
      username: username,
    };
    console.log("username1: ", username);
    const response = await axios.post(`${API_URL}/getUsers`, data);
    console.log("users: ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUser = async (username) => {
  try {
    const data = {
      username: username,
    };
    const response = await axios.post(`${API_URL}/getUser`, data);
    console.log("check userdata: ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getUsers, getUser };
