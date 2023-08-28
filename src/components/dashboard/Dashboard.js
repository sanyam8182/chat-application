import React, { useEffect } from "react";
import { Posts } from "./dashboradComponents/Posts";
import { Chat } from "./dashboradComponents/Chat";
import { Contacts } from "./dashboradComponents/Contacts";
import useChatStore from "../../store/ChatStore";
import { getCookie } from "../../services/authService";
import jwtDecode from "jwt-decode";
import { getUser, getUsers } from "../../services/userService";

import {
  getChatRoom,
  getChatRooms,
  createChatRoom,
} from "../../services/chatService";

export const Dashboard = () => {
  const { drawerOpen, setdrawerOpen } = useChatStore();
  const { user, setUser } = useChatStore();
  const { otherUsers, setOtherUsers } = useChatStore();
  const { chatroomOpen, setChatroomOpen } = useChatStore();
  const { chatRooms, setChatRooms } = useChatStore();

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
            setUser({
              firstname: "",
              lastname: "",
              username: decodedToken.username,
              email: "",
            });
            getChatRoomsData(decodedToken.username);
          }
        } catch (error) {
          console.log("Error decoding JWT token:", error.message);
        }
      } else {
        console.log("JWT token not found in the cookie.");
      }
    } else {
      getChatRoomsData(user.username);
    }
  };

  const getChatRoomsData = async (username) => {
    const chatRoomsData = await getChatRooms();
    chatRoomsData.forEach((chatRoom) => {
      if (chatRoom.users.includes(username) || chatRoom.is_private === false)
        chatRooms.push(chatRoom);
    });
    setChatRooms(chatRooms);
    await getUserData(username);
  };

  const getUserData = async (username) => {
    const userData = await getUser(username);
    setUser(userData.user);
    const users = await getUsers(userData.user.username);
    console.log("usersDashboard", users);
    setOtherUsers(users);
    if (users.users) {
      for (let i = 0; i < users.users.length; i++) {
        const item = users.users[i].username;
        const exists = chatRooms.some(
          (chatRoom) =>
            chatRoom.users.includes(item) && chatRoom.is_private === true
        );
        console.log("Check exists: ", exists, item);
        if (!exists) {
          const chatRoomUsers = [username, item];
          const chatRoomData = await createChatRoom(chatRoomUsers, true, "");
          console.log("chat room created: ", chatRoomData);
          chatRooms.push(chatRoomData);
          setChatRooms(chatRooms);
        }
      }
    }
  };

  useEffect(() => {
    console.log(!user.username);
    validateUser();
  }, []);

  return (
    <div className=" h-full bg-[#fafafa]  ">
      <div className="bg-[#1B5DE0] h-[80px] flex items-center justify-between text-white ">
        <h1>Logo</h1>
        <h1>Search</h1>
        <h1>Account Box</h1>
      </div>
      <div className="flex p-6 gap-6 flex-grow ">
        <Posts />
        <div
          className={`flex gap-0 flex-grow ${
            chatroomOpen ? "w-[60%]" : "w-[30%]"
          }`}
        >
          <div
            className={` shadow-4px rounded-md ${
              chatroomOpen ? "w-[50%]" : "w-[100%]"
            }`}
          >
            <Contacts />
          </div>
          {chatroomOpen && (
            <div className=" w-[50%] shadow-4px ">
              <Chat />
            </div>
          )}
        </div>
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
