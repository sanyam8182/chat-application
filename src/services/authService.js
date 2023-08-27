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
    console.log("userdata: ", response);
    const decodedToken = jwtDecode(response.data.token);
    const expirationTime = new Date(decodedToken.exp * 1000);
    document.cookie = `jwt=${response.data.token}; path=/; expires=${expirationTime}; secure; SameSite=strict`;
    return response.data.token;
  } catch (error) {
    throw error;
  }
};

const getCookie = (name) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

export { register, login, getCookie };
