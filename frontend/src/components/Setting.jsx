import axios from "axios";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { openTableClick, closeSetting } from "../redux/sliceOpenOption";
import { selectRoom } from "../redux/sliceSelectRoom";
const Setting = () => {
  const dispatch = useDispatch();
  const handleOpenClick = () => {
    dispatch(openTableClick());
    dispatch(closeSetting());
  };
  const { room } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.user);
  const isAdmin = room.adMinGroupId === user._id;

  const token = localStorage.getItem("Token");
  const [validation, setValidation] = useState("");
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/conversation/deleteGroup/${room._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(closeSetting());
      dispatch(selectRoom({ friend: null, roomId: null }));
      window.location.reload();
    } catch (error) {
      return setValidation(error.response.data.message);
    }
  };

  const handleLeave = async () => {
    try {
      await axios.put(
        `/api/v1/conversation/leaveGroup/${room._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {room && (
        <>
          <div className="fixed z-10 top-0 left-0 w-[100%] h-[100%] bg-[#7a707033]"></div>
          <div className="fixed z-10 p-12  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  shadow bg-white">
            <div className="flex justify-between items-center">
              <div className="text-[2.4rem] font-bold ">Setting</div>
              <FaTimes
                onClick={() => dispatch(closeSetting())}
                className="cursor-pointer"
                size={25}
              ></FaTimes>
            </div>
            <div className="mt-[4rem] flex justify-between w-[30rem] items-center">
              <div className="font-bold">Avatar Group: </div>
              <div>
                <input className="hidden " id="avatarGroup" type="file" />
                <label htmlFor="avatarGroup">
                  <img
                    className="w-[6rem] h-[6rem] rounded-full cursor-pointer object-cover"
                    src={room.img || room.avatar}
                    alt=""
                  />
                </label>
              </div>
            </div>
            <div className="mt-[4rem] flex justify-between w-[30rem] items-center">
              <div className="font-bold">Name: </div>
              <h1>{room.nameGroup || room.name}</h1>
            </div>
            <div className="cursor-pointer p-[1rem] bg-violet-500 mt-[3rem] text-center text-white">
              Member
            </div>
            {room.isGroup && (
              <div className="mt-[3rem]  w-[30rem] items-center">
                <div className="mb-[2rem] text-red-600">{validation}</div>
                <div className="flex items-center justify-between">
                  <div
                    onClick={handleLeave}
                    className=" text-white p-4 cursor-pointer bg-red-500"
                  >
                    Leave
                  </div>
                  {isAdmin && (
                    <>
                      <div
                        onClick={handleOpenClick}
                        className=" text-white p-4 cursor-pointer bg-red-500"
                      >
                        Click
                      </div>
                      <div
                        onClick={handleDelete}
                        className=" text-white p-4 cursor-pointer bg-red-500"
                      >
                        Delete
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Setting;
