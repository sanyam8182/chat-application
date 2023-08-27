import { create } from "zustand";

const useChatStore = create((set) => ({
  user: null,
  chatRooms: [],
  currentRoom: null,
  messages: [
    {
      username: "sayam", // Use the current user's username
      message: "hello",
    },
  ],
  onlineUsers: [],

  setUser: (payload) => set({ user: payload }),
  setChatRooms: (payload) => set({ chatRooms: payload }),
  setCurrentRoom: (payload) => set({ currentRoom: payload }),
  setMessages: (payload) => set({ messages: payload }),
  setOnlineUsers: (payload) => set({ onlineUsers: payload }),
}));

export default useChatStore;
