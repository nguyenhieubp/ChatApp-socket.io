import React from "react";
import { useDispatch } from "react-redux";
import { selectRoom } from "../redux/sliceSelectRoom";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const socket = io(ENDPOINT);
const Group = ({ room }) => {
  const dispatch = useDispatch();
  // socket.emit("disconnect", room);
  const handleChooseRoom = (room) => {
    dispatch(selectRoom(room));
  };
  return (
    <>
      {room && (
        <div
          onClick={() => handleChooseRoom(room)}
          className="mb-[4rem] p-4 flex items-center border-b-2 border-[#a9acb8f3] cursor-pointer "
        >
          <div className="w-[5rem] h-[5rem] ">
            <img
              className="w-[100%] h-[100%] object-cover rounded-full"
              src={room.img}
              alt=""
            />
          </div>
          <div className="ml-[3rem]">
            <div className="font-bold mb-4">{room.nameGroup}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Group;
