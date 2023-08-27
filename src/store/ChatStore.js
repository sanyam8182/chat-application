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
  chatroomOpen: false,

  setUser: (payload) => set({ user: payload }),
  setChatRooms: (payload) => set({ chatRooms: payload }),
  setCurrentRoom: (payload) => set({ currentRoom: payload }),
  setMessages: (payload) => set({ messages: payload }),
  setOnlineUsers: (payload) => set({ onlineUsers: payload }),
  setChatroomOpen: (payload) => set({ chatroomOpen: payload })
}));

export default useChatStore;