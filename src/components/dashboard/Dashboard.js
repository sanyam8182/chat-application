import React, { useEffect } from "react";
import { Posts } from "./dashboradComponents/Posts";
import { Chat } from "./dashboradComponents/Chat";
import { Contacts } from "./dashboradComponents/Contacts";
import useChatStore from "../../store/ChatStore";
import { getCookie } from "../../services/authService";
import jwtDecode from "jwt-decode";
import { getUser, getUsers } from "../../services/userService";
import userTop from "../../assets/userTop.svg"
import logo from "../../assets/G1614.svg"
import search from "../../assets/search.svg"

import {
  getChatRoom,
  getChatRooms,
  createChatRoom,
} from "../../services/chatService";
import { ChatroomDrawer } from "./dashboradComponents/ChatroomDrawer";

export const Dashboard = () => {
  const { drawerOpen, setdrawerOpen } = useChatStore();
  const { user, setUser } = useChatStore();
  var { otherUsers, setOtherUsers } = useChatStore();
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
    users.users.forEach((user) => {
      const otheruserData = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        is_checked: false,
      };
      otherUsers.push(otheruserData);
    });
    setOtherUsers(otherUsers);
    console.log("usersDashboard", otherUsers);
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
      <div className="bg-[#1B5DE0] h-[80px] flex items-center justify-between text-white px-6 ">
        <img src={logo} className=" w-[28px] h-[28px] " ></img>
        <div className=" bg-[#f5f5f5] w-96 h-[36px] p-4 rounded-md flex flex-row items-center ">
          <img src={search} className=" w-[20px] h-[20px] "></img>
          <input type="text" placeholder="Search" className=" bg-transparent border-none focus:ring-transparent text-[#474747] text-base font-[Inter] font-normal " ></input>
        </div>
        <img src={userTop}></img>
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
        className={`bg-[#ffffff] fixed right-0 top-0 h-[100vh] w-[500px] origin-left transition duration-700 z-50 ${
          drawerOpen ? "-translate-x-[0%]" : "translate-x-[100%] "
        } `}
      >
        <ChatroomDrawer />
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
