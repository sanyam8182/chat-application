import io from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // Replace with your backend server URL

export const socket = io(SOCKET_URL, {
  transports: ["websocket"], // Use only websockets for communication
});

export const connectToRoom = (room_id) => {
  console.log("connecting: ", room_id);
  socket.emit("join-room", room_id);
};

export const sendMessage = (room_id, message) => {
  socket.emit("send-message", { room_id, message });
};
