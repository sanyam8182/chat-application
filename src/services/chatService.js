import axios from "axios";

const API_URL = "http://localhost:3000/chat";

const getChatRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/getChatRooms`);
    console.log("chat rooms data: ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getChatRoom = async (username) => {
  try {
    const data = {
      username: username,
    };
    console.log(data);
    const response = await axios.post(`${API_URL}/getChatRoom`, data);
    console.log("check chat room data: ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createChatRoom = async (usersData, is_private, name) => {
  try {
    const data = {
      users: usersData,
      is_private: is_private,
      name: name,
    };
    console.log(data);
    const response = await axios.post(`${API_URL}/createChatRoom`, data);
    console.log("check chat room data: ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getMessagesForRoom = async (room_id) => {
  try {
    const data = {
      room_id: room_id,
    };
    console.log(data);
    const response = await axios.post(`${API_URL}/get-messages`, data);
    console.log("check room messges data: ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const storeMessage = async (room_id, message, sender) => {
  try {
    const data = {
      room_id: room_id,
      message: message,
      sender: sender,
    };
    console.log("check send message data: ", data);
    const response = await axios.post(`${API_URL}/store-message`, data);
    console.log("check room messges data: ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getChatRoom,
  getChatRooms,
  createChatRoom,
  getMessagesForRoom,
  storeMessage,
};
