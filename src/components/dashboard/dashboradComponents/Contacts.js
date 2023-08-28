import React from "react";
import useChatStore from "../../../store/ChatStore";

export const Contacts = () => {
  const { drawerOpen, setdrawerOpen } = useChatStore();
  const { otherUsers, setOtherUsers } = useChatStore();
  const { user, setUser } = useChatStore();
  const { chatroomOpen, setChatroomOpen } = useChatStore();
  var { currentRoom, setCurrentRoom } = useChatStore();
  const { chatRooms, setChatRooms } = useChatStore();

  const handleChatroom = (chatRoom) => {
    console.log(chatRoom);
    if (currentRoom.room_id !== chatRoom.room_id) {
      currentRoom = chatRoom;
      setCurrentRoom(currentRoom);
      setChatroomOpen(true);
    } else {
      setChatroomOpen(!chatroomOpen);
    }
  };

  return (
    <div className=" shadow-md  w-full ">
      <div className="flex justify-between p-6 text-base items-center ">
        <h1 className="text-2xl font-semibold">Contacts</h1>
        <div>
          <button
            onClick={() => setdrawerOpen(!drawerOpen)}
            className="font-medium border-2 rounded-lg px-4 py-3 hover:bg-[#EBEBEB] active:bg-[#EBF5FF] cursor-pointer "
          >
            + Create Room
          </button>
        </div>
      </div>
      <div className=" h-[200px] overflow-y-visible ">
        {chatRooms.map((chatRoom, index) => {
          return (
            <div
              index={index}
              key={chatRoom.room_id}
              className="bg-white hover:bg-[#EBF5FF] min-h-[89px] border-solid border-b-2 flex p-4 gap-2 cursor-pointer"
              onClick={() => handleChatroom(chatRoom)}
            >
              <div className="h-[32px] min-w-[32px]">
                <img
                  src="dp-placeholder.png"
                  alt="profile-pic"
                  className="h-[32px] w-[32px]"
                />
              </div>
              <div>
                <h1 className="text-xl font-normal ">
                  {chatRoom.is_private
                    ? chatRoom.users.filter((str) => str !== user.username)[0]
                    : chatRoom.users.join(",")}
                </h1>
                <p className="text-sm font-normal">New York, United States</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
