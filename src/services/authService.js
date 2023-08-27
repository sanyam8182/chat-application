import axios from "axios";
import jwtDecode from "jwt-decode";

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
    const token = login(username, password);
    const decodedToken = jwtDecode(token);
    const expirationTime = new Date(decodedToken.exp * 1000);
    document.cookie = `jwt=${token}; path=/; expires=${expirationTime}; secure; SameSite=strict`;
  } catch (error) {
    throw error;
  }
};

const login = async (username, password) => {
  try {
    const data = {
      username: username,
      password: password,
    };
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data.token;
  } catch (error) {
    throw error;
  }
};

export { register, login };
