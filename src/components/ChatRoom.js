import React, { useEffect } from "react";
import useChatStore from "../store/ChatStore";
import { connectToRoom, sendMessage, socket } from "../services/socketService";

const ChatRoom = () => {
  const { currentRoom, setCurrentRoom } = useChatStore();

  const { user, setUser } = useChatStore();
  const { messages, setMessages } = useChatStore();
  const { newMessage, setNewMessage } = useChatStore();

  useEffect(() => {
    console.log(currentRoom.roomId);

    connectToRoom(currentRoom.roomId);

    // Listen for incoming messages and update the state
    socket.on("message", (message) => {
      messages.push(message);
      setMessages(messages);
    });
    // Clean up the socket event listener when the component unmounts
    return () => {
      socket.off("message");
    };
  }, [currentRoom.roomId]);

  const handleSendMessage = () => {
    if (newMessage.message.trim() !== "") {
      sendMessage(currentRoom.roomId, newMessage);
    }
  };

  return (
    <div className=" h-screen flex flex-col gap-6 ">
      <div>
        {messages.map((msg, index) => (
          <div key={index} className=" flex flex-col gap-6 ">
            {msg.message}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your message"
          value={newMessage.message}
          onChange={(e) =>
            setNewMessage({
              name: `${user.firstname} ${user.lastname}`,
              usename: user.username,
              message: e.target.value,
              created_at: new Date().toISOString(),
            })
          }
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
