import axios from "axios";
import jwtDecode from "jwt-decode";
import useChatStore from "../store/ChatStore";

const API_URL = "http://localhost:3000/auth";

const register = async (firstName, lastName, username, email, password) => {
  const data = {
    firstname: firstName,
    lastname: lastName,
    username: username,
    email: email,
    password: password,
  };

  try {
    await axios.post(`${API_URL}/register`, data);
    await login(username, password);
    console.log(document.cookie);
  } catch (error) {
    throw error;
  }
};

// const { user, setUser } = useChatStore();

const login = async (username, password) => {
  try {
    const data = {
      username: username,
      password: password,
    };
    const response = await axios.post(`${API_URL}/login`, data);
    const decodedToken = jwtDecode(response.data.token);
    const expirationTime = new Date(decodedToken.exp * 1000);
    document.cookie = `jwt=${response.data.token}; path=/; expires=${expirationTime}; secure; SameSite=strict`;
    //setUser({ username });
    return response.data.token;
  } catch (error) {
    throw error;
  }
};

export { register, login };
