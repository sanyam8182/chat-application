import { create } from "zustand";

const useChatStore = create((set) => ({
  user: {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  },
  chatRooms: [],
  currentRoom: {
    id: "",
    room_id: "1",
    users: [],
    created_at: "",
    is_private: true,
  },
  messages: [],
  newMessage: {
    name: "",
    username: "",
    message: "",
    created_at: "",
  },
  onlineUsers: [],
  drawerOpen: false,
  chatroomOpen: false,
  otherUsers: [],

  setUser: (payload) => set({ user: payload }),
  setChatRooms: (payload) => set({ chatRooms: payload }),
  setCurrentRoom: (payload) => set({ currentRoom: payload }),
  setMessages: (payload) => set({ messages: payload }),
  setNewMessage: (payload) => set({ newMessage: payload }),
  setOnlineUsers: (payload) => set({ onlineUsers: payload }),
  setdrawerOpen: (payload) => set({ drawerOpen: payload }),
  setChatroomOpen: (payload) => set({ chatroomOpen: payload }),
  setOtherUsers: (payload) => set({ otherUsers: payload }),
}));

export default useChatStore;
