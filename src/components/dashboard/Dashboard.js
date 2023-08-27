import React from "react";
import { Posts } from "./dashboradComponents/Posts";
import { Chat } from "./dashboradComponents/Chat";
import { Contacts } from "./dashboradComponents/Contacts";
import useChatStore from "../../store/ChatStore";

export const Dashboard = () => {
  const { chatroomOpen, setChatroomOpen } = useChatStore();


  const handleDrawer = () => {
    console.log(chatroomOpen)
    setChatroomOpen(!chatroomOpen)
  }

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
        {/* <Chat /> */}
      </div>
      <div
        className={`bg-red-400 fixed right-0 top-0 h-[100vh] w-[500px] origin-left transition duration-700 z-50 ${
          chatroomOpen ? "-translate-x-[0%]" : "translate-x-[100%] "
        } `}
      >
        drawer
      </div>
      {chatroomOpen && (
        <div
          className="h-[100vh] w-[100vw] bg-[#00000094] fixed top-0 left-0 z-40"
          onClick={ () => setChatroomOpen(!chatroomOpen)}
        >
          overlay
        </div>
      )}
    </div>
  );
};
