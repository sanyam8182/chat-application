import React, { useEffect } from "react";
import { Posts } from "./dashboradComponents/Posts";
import { Chat } from "./dashboradComponents/Chat";
import { Contacts } from "./dashboradComponents/Contacts";
import useChatStore from "../../store/ChatStore";
import { getCookie } from "../../services/authService";
import jwtDecode from "jwt-decode";
import { getUser, getUsers } from "../../services/userService";

export const Dashboard = () => {
  const { drawerOpen, setdrawerOpen } = useChatStore();
  const { user, setUser } = useChatStore();
  const { otherUsers, setOtherUsers } = useChatStore();
  const { chatroomOpen, setChatroomOpen } = useChatStore();

  const validateUser = () => {
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
  };

  const getUserData = async (username) => {
    const userData = await getUser(username);
    setUser(userData.user);
    const users = await getUsers(userData.user.username);
    console.log("usersDashboard", users);
    setOtherUsers(users);
  };

  useEffect(() => {
    console.log(!user.username);
    validateUser();
  }, []);

  return (
    <div className=" min-h-screen bg-[#fafafa] ">
      <div className="bg-[#1B5DE0] h-[80px] flex items-center justify-between text-white ">
        <h1>Logo</h1>
        <h1>Search</h1>
        <h1>Account Box</h1>
      </div>
      <div className="flex   p-6 gap-6 ">
        <Posts />
        <Contacts />
        {chatroomOpen && <Chat />}
      </div>
      <div
        className={`bg-red-400 fixed right-0 top-0 h-[100vh] w-[500px] origin-left transition duration-700 z-50 ${
          drawerOpen ? "-translate-x-[0%]" : "translate-x-[100%] "
        } `}
      >
        drawer
      </div>
      {drawerOpen && (
        <div
          className="h-[100vh] w-[100vw] bg-[#00000094] fixed top-0 left-0 z-40"
          onClick={() => setdrawerOpen(!drawerOpen)}
        >
          overlay
        </div>
      )}
    </div>
  );
};
