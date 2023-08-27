import React from "react";
import useChatStore from "../../../store/ChatStore";

export const Contacts = () => {

  const {chatroomOpen, setChatroomOpen } = useChatStore()
  const {otherUsers, setOtherUsers} = useChatStore()
  console.log('otherUsers',otherUsers)

  return (
    <div className=" shadow-md  w-[30%] h-full ">
      <div className="flex justify-between p-6 text-base items-center ">
        <h1 className="text-2xl font-semibold">Contacts</h1>
        <div>
          <button onClick={() => setChatroomOpen(!chatroomOpen)} className="font-medium border-2 rounded-lg px-4 py-3 hover:bg-[#EBEBEB] active:bg-[#EBF5FF] ">
            + Create Room
          </button>
        </div>
      </div>
      <div className=" h-[200px] overflow-y-visible ">
        
        <div className="bg-white hover:bg-[#EBF5FF] h-20 border-solid border-b-2 flex p-4 gap-2">
          <div className="h-[32px] min-w-[32px]">
            <img
              src="dp-placeholder.png"
              alt="profile-pic"
              className="h-[32px] w-[32px]"
            />
          </div>
          <div>
            <h1 className="text-xl font-normal ">Peter Gould</h1>
            <p className="text-sm font-normal">New York, United States</p>
          </div>
        </div>
      
        
      </div>
      
    </div>
  );
};
