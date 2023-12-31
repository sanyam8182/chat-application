import React from "react";
import useChatStore from "../../../store/ChatStore";

export const Posts = () => {
  const { chatroomOpen, setChatroomOpen } = useChatStore();
  return (
    <div
      className={`h-full  transition duration-700 ${
        chatroomOpen ? "w-[40%] " : "w-[70%]"
      }`}
    >
      <div className=" flex shadow-md p-4 ">
        <div className="h-[64px] min-w-[64px]">
          <img
            src="dp-placeholder.jpeg"
            alt="profile-pic"
            className="h-[64px] w-[64px] rounded-[32px]"
          />
        </div>
        <div className=" pr-4 rb-4 pl-3 ">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-[21px] ">Ashish Garg,</h1>
              <h1 className="text-xs"> an hour ago</h1>
            </div>
            <div className="flex items-center  gap-1">
              <div className="h-[12px] w-[12px] text-xs ">
                <img
                  src="likes-icon.png"
                  alt="likes-icon"
                  height={12}
                  width={12}
                />
              </div>
              <h1>5</h1>
            </div>
          </div>
          <h1 className="text-[14px] font-medium ">
            Web-based panel and discussion next week, please attend as you wish:
            looks like a good event, though their not including Karen or Deepa
            on the dais is a disappointing oversight
          </h1>
          <div className="flex gap-2 ">
            <h1 className="font-medium text-[#1B5DE0] underline ">Reply</h1>
            <h1 className="font-medium text-[#1B5DE0] underline ">Like</h1>
          </div>
          {/* replies */}
          <div className="flex gap-2 mt-4">
            <img
              src="reply-icon.png"
              alt="reply-icon"
              className="h-[12px] w-[13.33px]"
            />
            <div className=" flex shadow-md p-4 ">
              <div className="h-[32px] min-w-[32px]">
                <img
                  src="dp-placeholder.jpeg"
                  alt="profile-pic"
                  className="h-[32px] w-[32px] rounded-[16px]"
                />
              </div>
              <div className=" pr-4 rb-4 pl-3 ">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <h1 className="text-[21px] ">Ashish Garg,</h1>
                    <h1 className="text-xs"> an hour ago</h1>
                  </div>
                  <div className="flex items-center  gap-1">
                    <div className="h-[12px] w-[12px] text-xs ">
                      <img
                        src="likes-icon.png"
                        alt="likes-icon"
                        height={12}
                        width={12}
                      />
                    </div>
                    <h1>5</h1>
                  </div>
                </div>
                <h1 className="text-[14px] font-medium ">
                  Web-based panel and discussion next week, please attend as you
                  wish: looks like a good event, though their not including
                  Karen or Deepa on the dais is a disappointing oversight
                </h1>
                <div className="flex gap-2 ">
                  <h1 className="font-medium text-[#1B5DE0] underline ">
                    Like
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <img
              src="reply-icon.png"
              alt="reply-icon"
              className="h-[12px] w-[13.33px]"
            />
            <div className=" flex shadow-md p-4 ">
              <div className="h-[32px] min-w-[32px]">
                <img
                  src="dp-placeholder.jpeg"
                  alt="profile-pic"
                  className="h-[32px] w-[32px] rounded-[16px]"
                />
              </div>
              <div className=" pr-4 rb-4 pl-3 ">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <h1 className="text-[21px] ">Ashish Garg,</h1>
                    <h1 className="text-xs"> an hour ago</h1>
                  </div>
                  <div className="flex items-center  gap-1">
                    <div className="h-[12px] w-[12px] text-xs ">
                      <img
                        src="likes-icon.png"
                        alt="likes-icon"
                        height={12}
                        width={12}
                      />
                    </div>
                    <h1>5</h1>
                  </div>
                </div>
                <h1 className="text-[14px] font-medium ">
                  Web-based panel and discussion next week, please attend as you
                  wish: looks like a good event, though their not including
                  Karen or Deepa on the dais is a disappointing oversight
                </h1>
                <div className="flex gap-2 ">
                  <h1 className="font-medium text-[#1B5DE0] underline ">
                    Like
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
