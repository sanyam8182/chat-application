import React, { useEffect, useState } from "react";
import { connectToRoom, sendMessage } from "../services/socketService";
import useChatStore from "../store/ChatStore";

const ChatRoom = () => {
  const roomId = useChatStore((state) => state.currentRoom);

  const { messages, setMessages } = useChatStore();

  console.log(messages);

  useEffect(() => {
    connectToRoom(roomId);
  }, [roomId]);

  const handleSendMessage = (e) => {
    // if (message.trim() !== "") {
    //   sendMessage(roomId, message);
    //   setMessage("");
    // }
    setMessages([
      {
        username: "1", // Use the current user's username
        message: "hello",
      },
    ]);
    console.log(messages);
  };

  return (
    <div className=" h-screen flex ">
      <div>
        {/* {messages.map((msg, index) => (
          <div key={index} className=" flex ">
            {msg}
          </div>
        ))} */}
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your message"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
