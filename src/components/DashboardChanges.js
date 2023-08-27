import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsers, getUser } from "../services/userService";
import useChatStore from "../store/ChatStore";
import { getCookie } from "../services/authService";
import jwtDecode from "jwt-decode";

const Dashboard = () => {
  const { user, setUser } = useChatStore();

  useEffect(() => {
    console.log(!user.username);

    if (!user.username) {
      const token = getCookie("jwt");
      console.log(token);
      if (token) {
        try {
          // Decode the JWT token
          const decodedToken = jwtDecode(token);

          // Check token expiration
          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp < currentTime) {
            console.log("JWT token has expired.");
          } else {
            console.log("Valid JWT token");
            getUserData(decodedToken.username);
          }
        } catch (error) {
          console.log("Error decoding JWT token:", error.message);
        }
      } else {
        console.log("JWT token not found in the cookie.");
      }
    } else {
      const users = getUsers(user.username);
    }
  }, []);

  const getUserData = async (username) => {
    const userData = await getUser(username);
    setUser(userData.user);
    const users = await getUsers(userData.user.username);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/chat">Chat Room 1</Link>
      <Link to="/chat">Chat Room 2</Link>
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
