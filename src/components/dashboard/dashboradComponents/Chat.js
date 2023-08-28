import React, { useEffect } from "react";
import useChatStore from "../../../store/ChatStore";
import close from "../../../assets/close.svg";
import arrow from "../../../assets/arrow.svg";

import {
  connectToRoom,
  sendMessage,
  socket,
} from "../../../services/socketService";
import {
  getMessagesForRoom,
  storeMessage,
} from "../../../services/chatService";
import { constant } from "lodash";

export const Chat = () => {
  const { chatroomOpen, setChatroomOpen } = useChatStore();
  const { currentRoom, setCurrentRoom } = useChatStore();
  const { user, setUser } = useChatStore();
  var { messages, setMessages } = useChatStore();
  const { newMessage, setNewMessage } = useChatStore();

  const handleSend = async () => {
    if (newMessage.message.trim() !== "") {
      console.log("new message: ", newMessage);
      sendMessage(currentRoom.room_id, newMessage);

      await storeMessage(
        currentRoom.room_id,
        newMessage.message,
        newMessage.name
      );
    }
  };

  const getMessagesData = async (room_id) => {
    const messagesData = await getMessagesForRoom(room_id);
    console.log("messages for room: ", messagesData);
    messages = [];
    messagesData.forEach((message) => {
      const messageData = {
        name: message.sender,
        usename: "",
        message: message.message,
        created_at: message.created_at,
      };
      messages.push(messageData);
    });
    setMessages(messages);
  };

  useEffect(() => {
    console.log(currentRoom.room_id);

    connectToRoom(currentRoom.room_id);
    getMessagesData(currentRoom.room_id);
    // Listen for incoming messages and update the state
    socket.on("message", (message) => {
      messages.push(message);
      setMessages(messages);
    });
    // Clean up the socket event listener when the component unmounts
    return () => {
      socket.off("message");
    };
  }, [currentRoom.room_id]);

  return (
    <div className=" w-full h-full flex flex-col rounded-md bg-[#ffffff] items-center ">
      <div className=" h-14 w-full flex flex-row justify-end items-center ">
        <label className=" font-normal text-xs ">Close</label>
        <button onClick={() => setChatroomOpen(!chatroomOpen)}>
          <img src={close} className=" h-6 w-6 "></img>
        </button>
      </div>
      <div className=" flex-grow mb-4 w-[95%] h-[80%] ">
        {messages.map((message, index) => {
          return (
            <div
              index={index}
              key={index}
              className=" min-h-[89px] bg-white border-solid border-b-2 flex p-4 gap-2 rounded-md shadow-4px "
            >
              <div className="h-[32px] min-w-[32px]">
                <img
                  src="dp-placeholder.png"
                  alt="profile-pic"
                  className="h-[32px] w-[32px]"
                />
              </div>
              <div>
                <h1 className="text-xl font-normal ">{message.name}</h1>
                <p className="text-sm font-normal">{message.message}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" h-[100px] w-[95%] flex flex-row items-center bg-[#ffffff] rounded-md px-6 gap-4 mt-auto shadow-4pxt ">
        <textarea
          placeholder="Type Something ..."
          className=" h-[52px] bg-[#f5f5f5] min-w-[75%] font-[Inter] text-sm font-normal px-4 py-4 "
          onChange={(e) =>
            setNewMessage({
              name: `${user.firstname} ${user.lastname}`,
              usename: user.username,
              message: e.target.value,
              created_at: new Date().toISOString(),
            })
          }
        ></textarea>
        <button
          className=" flex justify-center items-center h-fit w-fit bg-[#1B5DE0] rounded-md "
          onClick={handleSend}
        >
          <img src={arrow} className=" h-[20px] w-[20px] mx-8 my-4 "></img>
        </button>
      </div>
    </div>
  );
};
