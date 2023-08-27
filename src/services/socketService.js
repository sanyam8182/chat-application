import io from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // Replace with your backend server URL

export const socket = io(SOCKET_URL, {
  transports: ["websocket"], // Use only websockets for communication
});

export const connectToRoom = (roomId) => {
  socket.emit("join-room", roomId);
};

export const sendMessage = (roomId, message) => {
  socket.emit("send-message", { roomId, message });
};
