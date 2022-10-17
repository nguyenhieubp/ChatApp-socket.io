import React from "react";
import { VscGripper } from "react-icons/vsc";
import { format } from "timeago.js";
const FriendChat = ({ avatar, text, sender, time }) => {
  return (
    <div className="mb-[6rem]">
      <div className="relative flex items-end">
        <div className="absolute left-[5rem] top-[-2.5rem]">{sender.name}</div>
        <div className="w-[3rem] h-[3rem] cursor-pointer">
          <img
            className="w-[100%] h-[100%] rounded-full object-cover"
            src={avatar}
            alt=""
          />
        </div>
        <div>
          <div className="flex items-center">
            <div className="max-w-sm ml-[2rem] shadow p-4 bg-[#b3b1b3] rounded-r-[2rem] rounded-tl-[1rem]">
              <p>{text}</p>
            </div>
            <div className="ml-[1rem] cursor-pointer">
              <VscGripper size={30}></VscGripper>
            </div>
          </div>
        </div>
      </div>
      <div className="text-left ml-[5rem] mt-2">{format(time)}</div>
    </div>
  );
};

export default FriendChat;
