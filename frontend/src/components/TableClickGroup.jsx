import React from "react";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  openSetting,
  closeTableClick,
  openTableClick,
} from "../redux/sliceOpenOption";
import axios from "axios";
import { useEffect } from "react";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const socket = io(ENDPOINT);
const TableClickGroup = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const [valueSearch, setValueSearch] = useState("");
  const [clickFriend, setClickFriend] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [members, setMembers] = useState([]);
  const { room } = useSelector((state) => state.room);
  const idListFriend = clickFriend.map((item) => {
    return item._id;
  });
  useEffect(() => {
    const getMember = async () => {
      const response = await axios.get(
        `/api/v1/conversation/friendInGroup/${room._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMembers(response.data.members);
    };
    getMember();
  }, [room._id, token]);

  const handleClick = async () => {
    const response = await axios.put(
      `/api/v1/conversation/kickGroup/${room._id}`,
      {
        listKick: idListFriend,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    dispatch(openTableClick(false));
    socket.emit("change members", response.data.conversation);
    // dispatch(openSetting(false));
    handleCloseClick();
  };

  useEffect(() => {
    socket.on("get members", (data) => console.log(data));
  }, [members]);

  const handleChecked = (e, item) => {
    const { id, checked } = e.target;
    if (checked) {
      setClickFriend([...clickFriend, item]);
    } else {
      setClickFriend(clickFriend.filter((item) => item._id !== id));
    }
  };

  const handleCloseClick = () => {
    dispatch(closeTableClick());
    dispatch(openSetting());
  };

  console.log(members);

  return (
    <div>
      <div className="fixed z-10 top-0 left-0 w-[100%] h-[100%] bg-[#7a707033]"></div>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
        <div className="w-[40rem] p-6 bg-white relative">
          <div
            onClick={handleCloseClick}
            className="absolute right-4 top-4 p-2 cursor-pointer"
          >
            <FaTimes size={25} color="red"></FaTimes>
          </div>
          <div className="text-center font-bold text-[2rem]">Click</div>
          <div className="mt-8 shadow bg-slate-300 p-4">
            {clickFriend.map((item) => (
              <div
                className="inline-block mr-4 bg-[#8244c1] text-white p-4 mb-4"
                key={item._id}
              >
                <div className="flex justify-between items-center ">
                  <div>{item.name}</div>
                  <label htmlFor={item._id}>
                    <div className="ml-[1rem]">
                      <FaTimes size={18} color="white"></FaTimes>
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="my-4">
            <div className="relative">
              <input
                onChange={(e) => setValueSearch(e.target.value)}
                placeholder="Search..."
                className="w-full border-2 border-[#3333] p-2 pr-16"
                type="text"
              />
              <div className="absolute top-2 right-2">
                <AiOutlineSearch size={25}></AiOutlineSearch>
              </div>
            </div>
          </div>
          <div className="w-full h-[30rem] mt-4 overflow-scroll">
            {members &&
              members
                // eslint-disable-next-line array-callback-return
                .filter((item) => {
                  if (item._id !== user._id)
                    if (valueSearch === "") {
                      return item;
                    } else if (
                      item.name
                        .toLowerCase()
                        .includes(valueSearch.toLowerCase())
                    ) {
                      return item;
                    }
                })
                .map((item) => (
                  <label key={item._id} htmlFor={item._id}>
                    <div className="flex justify-between items-center">
                      <div className=" p-4 flex items-center  cursor-pointer ">
                        <div className="w-[5rem] h-[5rem] ">
                          <img
                            className="w-[100%] h-[100%] rounded-full"
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAgMBB//EADgQAAICAQIBBgsHBQAAAAAAAAABAgMEBRExEiEiQVHRBhMjMlJhcYGRoeEVQkNikrHBFCRyovD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP3AAAAAAAAAEDP1WjEbhz2Wr7ser2sqpa/lN9CuqK7Gm/5A0gM/T4QWJ+Xpi49sHs/mXWLk05VXjKJ8pdfavaB7AAAAAAAAAAAAABC1fM/o8Ryg/KT6Me8mmd8JLG8qqvqjDf4v6AVDbbbfO3xbPgBUCTp+ZLDyY2JvkPmnFdaIwA3Kakk090+dM+kLR5uzTaG+Kjyfg9iaRQAAAAAAAAAADN+EkWsyufVKvm9zfeaQrddxHk4nKrW863yku1daAy4AKgAe2Ljzyr4U18ZPnfYu0DTaJFw0ynfrTfxbJxzXBVwjCK2jFJL2HRFAAAAAAAAAAAB4ZOXRix5V9ijvwXW/cVd3hBFPaihy/NN7fIDvUNEjdOVuNJVzfO4vzX3FXPSc6L28Rv61JMkPX8rqrp+D7z59vZfoU/pfeBxTomZZJeMjGpdspb/JF7gYFWDDavnm/Om+LKX7ey/Qp/S+87h4QZCfTpqkvVugNECqxtdx7GldGVT7eK+JZwnGyKlCSlF8GnvuB0AAAAAAAAVer6osTyNGzufFvhD6lhk2qjHstf3ItmLsnKyyU5veUnu32gLLJ2zc7JylJ8W2cgFQAAAAACThZt+HPlVS3i3zwfBkYAbLCy68yhW1+yUXxiyQZbQsh058Yb9C3otevq/71mpIoAAAAArtenyNNsXpNR+ZljR+Er/sq122L9mZwAACoAAAAAAAA9cafi8mqfozT+ZtTCm5i94p+oivoAAAACt1+mVuA5RTbrkpP2cDLm6KnO0Sm5ueO/FTfO47dF9wGbBNyNLzKG96XOPbX0vqQ2mns1s/WVHwAAAAAB9inJ7RTb7ETsbScu9p+L8XH0rOb5cQIdNUrroVxW7k0lsbZLZIhafptOEuUunY+M3/AATiKAAAAAAAAHE6q7FtZCMl+ZbnYAiT03Cn52NX7lt+x5vR8B/gP9cu8ngCAtGwF+B/vLvPSGmYMPNxoe/n/clgDiFVda8nCMf8VsdgAAAAAAH/2Q=="
                            alt=""
                          />
                        </div>
                        <div className="ml-[3rem]">
                          <div className="font-bold mb-4">{item.name}</div>
                        </div>
                      </div>
                      <input
                        value={item.name}
                        onClick={(e) => handleChecked(e, item)}
                        id={item._id}
                        type="checkbox"
                        className="h-[25px] w-[25px] align-middle bg-[#1111]"
                      ></input>
                    </div>
                  </label>
                ))}
          </div>
          <div className="mt-[2rem] w-[100%] flex justify-between items-center">
            <button
              onClick={handleClick}
              className="bg-[#8244c1] text-white text-center h-12 flex-grow ml-4 p-2"
            >
              Click
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableClickGroup;
