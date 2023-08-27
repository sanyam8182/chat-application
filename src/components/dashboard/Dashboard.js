import React from "react";
import { Posts } from "./dashboradComponents/Posts";
import { Chat } from "./dashboradComponents/Chat";
import { Contacts } from "./dashboradComponents/Contacts";

export const Dashboard = () => {
  return (
    <div className="h-screen">
      <div className="bg-[#1B5DE0] h-[80px] flex items-center justify-between text-white ">
        <h1>Logo</h1>
        <h1>Search</h1>
        <h1>Account Box</h1>
      </div>
      <div className="flex grow bg-[#fafafa] h-full p-6 gap-6 ">
        <Posts />
        <Contacts />
        {/* <Chat /> */}
      </div>
    </div>
  );
};
