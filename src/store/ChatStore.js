import { create } from "zustand";

const useChatStore = create((set) => ({
  user: {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  },
  chatRooms: [
    {
      roomid: "",
      username1: "",
      username2: "",
    },
  ],
  currentRoom: {
    roomId: "1",
    username1: "",
    username2: "",
  },
  messages: [
    {
      name: "Sayam Koul",
      usename: "sayam",
      message: "Hello!",
      created_at: "27 Aug 2023, 8:18 PM",
    },
  ],
  newMessage: {
    name: "",
    usename: "",
    message: "",
    created_at: "",
  },
  onlineUsers: [],

  setUser: (payload) => set({ user: payload }),
  setChatRooms: (payload) => set({ chatRooms: payload }),
  setCurrentRoom: (payload) => set({ currentRoom: payload }),
  setMessages: (payload) => set({ messages: payload }),
  setNewMessage: (payload) => set({ newMessage: payload }),
  setOnlineUsers: (payload) => set({ onlineUsers: payload }),
}));

export default useChatStore;
