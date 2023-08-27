import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connectToRoom, sendMessage } from '../services/socketService';

const ChatRoom = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    connectToRoom(roomId);
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      sendMessage(roomId, message);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Chat Room {roomId}</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
