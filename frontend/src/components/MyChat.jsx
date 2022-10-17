import React from "react";
import { format } from "timeago.js";
const MyChat = ({ avatar, text, sender, time }) => {
  return (
    <div className="mb-[6rem] cursor-pointer">
      <div className="flex items-end justify-end relative">
        <div className="absolute right-[5rem] top-[-2.5rem]">{sender.name}</div>
        <div className="flex items-center">
          <div className="max-w-sm mr-[2rem]  shadow p-4 bg-blue-500 rounded-l-[2rem] rounded-tr-[3rem]">
            <p>{text}</p>
          </div>
        </div>
        <div>
          <div className="w-[3rem] h-[3rem] cursor-pointer">
            <img
              className="w-[100%] h-[100%]  rounded-full object-cover"
              src={avatar}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="text-right mr-[5rem] mt-2">{format(time)}</div>
    </div>
  );
};

export default MyChat;
