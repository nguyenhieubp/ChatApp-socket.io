import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Chat from "./Chat";
import { openSetting } from "../redux/sliceOpenOption";
import TableClickGroup from "./TableClickGroup";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import Setting from "./Setting";
import waitingRoom from "../animations/room.json";
const Conversation = () => {
  const dispatch = useDispatch();
  const { tableClick } = useSelector((state) => state.open);
  const { tableSetting } = useSelector((state) => state.open);
  const { room } = useSelector((state) => state.room);
  const handleOpenSetting = () => {
    dispatch(openSetting());
  };
  return (
    <div>
      {tableClick && <TableClickGroup></TableClickGroup>}
      {tableSetting && <Setting></Setting>}
      {room ? (
        <div>
          <div className="px-[4rem] py-[2rem] shadow w-[100%] flex justify-between items-center">
            <div className="flex items-center">
              <div
                onClick={handleOpenSetting}
                className="w-[6rem] h-[6rem] cursor-pointer"
              >
                <img
                  className="w-[100%] h-[100%] rounded-[100%] object-cover "
                  src={room.avatar || room.img || room.friend.avatar}
                  alt=""
                />
              </div>
              <div className="ml-[2rem]">
                <div className="font-bold text-[2.2rem] mb-[1rem]">
                  {room.nameGroup}
                </div>
                <div className="flex items-center">
                  <div className="text-[1.3rem] text-[#c9ceda]">Active Now</div>
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-4"></div>
                </div>
              </div>
            </div>
            <div onClick={handleOpenSetting} className="cursor-pointer p-4">
              <AiOutlineMenu size={30}></AiOutlineMenu>
            </div>
          </div>
          <Chat></Chat>
        </div>
      ) : (
        <div className="hidden sm:flex  mt-[10rem]  justify-center items-center ">
          <Lottie animationData={waitingRoom} loop={true} />
        </div>
      )}
    </div>
  );
};

export default Conversation;
