import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // Replace with your backend server URL

const socket = io(SOCKET_URL, {
  transports: ['websocket'], // Use only websockets for communication
});

const connectToRoom = (roomId) => {
  socket.emit('join-room', roomId);

  // Listen for incoming messages
  socket.on('message', (message) => {
    // Handle the incoming message, e.g., update the UI
  });
};

const sendMessage = (roomId, message) => {
  socket.emit('send-message', { roomId, message });
};

export { socket, connectToRoom, sendMessage };
