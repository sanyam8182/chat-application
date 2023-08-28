import React, { useEffect, useState } from "react";
import close from "../../../assets/close.svg";
import useChatStore from "../../../store/ChatStore";
import search from "../../../assets/search.svg";
import arrow from "../../../assets/arrow.svg";
import { createChatRoom } from "../../../services/chatService";
import { forEach } from "lodash";

export const ChatroomDrawer = () => {
  const { otherUsers, setOtherUsers } = useChatStore();
  const { drawerOpen, setdrawerOpen } = useChatStore();
  const { chatRooms, setChatRooms } = useChatStore();
  var [selected, setSelected] = useState(0);
  var [roomName, setRoomName] = useState("");

  const handleCheckbox = (index) => {
    console.log("selected: ", selected);
    if (otherUsers[index].is_checked) {
      selected -= 1;
    } else {
      selected += 1;
    }
    otherUsers[index].is_checked = !otherUsers[index].is_checked;
    setOtherUsers(otherUsers);
    setSelected(selected);
  };

  const handleCreate = async () => {
    let userData = [];
    otherUsers?.forEach((user) => {
      if(user.is_checked){
        userData.push(user.username);
      }
    });
    if (userData.length != 0) {
      const chatRoomData = await createChatRoom(userData, false, roomName);
      chatRooms.push(chatRoomData);
      setChatRooms(chatRooms);
      for(let i = 0 ; i < otherUsers.length ; i++ ){
        otherUsers[i].is_checked = false;
      }
      setOtherUsers(otherUsers);
      setdrawerOpen(false);
      setRoomName("");
    }
  };

  return (
    
    <div className=" flex flex-col px-4 gap-4 h-screen ">
      { console.log("check other users: ", otherUsers.users)}
      <div className=" flex flex-row items-center">
        <label className=" font-semibold text-2xl flex-grow ">
          Create Room
        </label>
        <div className=" h-14 flex flex-row justify-end items-center self-end ">
          <label className=" font-normal text-xs ">Close</label>
          <button onClick={() => setdrawerOpen(!drawerOpen)}>
            <img src={close} className=" h-6 w-6 "></img>
          </button>
        </div>
      </div>
      <div className=" bg-[#f5f5f5] h-[36px] flex items-center p-2 gap-2 ">
        <img src={search} className=" h-[20px] w-[20px] "></img>
        <input
          type="text"
          placeholder="Search"
          className=" bg-transparent flex-grow font-[Inter] text-base font-normal focus:ring-transparent border-none "
        ></input>
      </div>
      <div className=" flex flex-col gap-4 flex-grow ">
        {otherUsers?.map((user, index) => {
          console.log("check user value: ", user);
          return (
            <div
              index={index}
              key={user.username}
              className=" min-h-[64px] rounded-b-md bg-[#ffffff] shadow-4px flex items-center p-4 gap-3 "
            >
              <input
                type="checkbox"
                className=" h-[20px] w-[20px] accent-[#1B5DE0] border-[#ebebeb] border-2 bg-[#f5f5f5] rounded-sm focus:ring-transparent "
                checked={user.is_checked}
                onClick={() => handleCheckbox(index)}
              ></input>
              <div className="h-[32px] min-w-[32px] ">
                <img
                  src="dp-placeholder.jpeg"
                  alt="profile-pic"
                  className="h-[32px] w-[32px] rounded-[16px]"
                />
              </div>
              <label className=" text-xl font-normal ">
                {""}
                {`${user.firstname} ${user.lastname}`}{" "}
              </label>
            </div>
          );
        })}
      </div>
      <div className=" self-end min-h-[200px] p-6 shadow-4pxt w-full flex flex-col ">
        <label className=" font-[Inter] text-sm font-medium mb-2 ">
          Group Name
        </label>
        <div className=" h-[52px] bg-[#f5f5f5] p-4 flex items-center mb-4 ">
          <input
            type="text"
            placeholder="Group name"
            className=" font-[Inter] text-base font-semibold border-none focus:ring-transparent bg-transparent "
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          ></input>
        </div>
        <div className=" flex items-center">
          <button className=" flex justify-center items-center h-fit w-fit bg-[#1B5DE0] rounded-md px-[32px] py-[16px] " 
          onClick={() => handleCreate()} >
            <label className=" text-[#ffffff] text-base font-medium font-[Inter] ">
              Confirm
            </label>
            <img src={arrow} className=" h-[20px] w-[20px] "></img>
          </button>
          <label className=" text-[#1B5DE0] text-lg font-semibold flex-grow text-right ">
            {`${selected} `}
            <label className=" text-[#000000] text-sm font-normal ">
              selected
            </label>
          </label>
        </div>
      </div>
    </div>
  );
};
