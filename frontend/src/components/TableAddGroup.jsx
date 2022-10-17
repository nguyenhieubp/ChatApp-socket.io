import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeTableAdd } from "../redux/sliceOpenOption";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { useRef } from "react";
import { selectRoom } from "../redux/sliceSelectRoom";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const socket = io(ENDPOINT);
const TableAddGroup = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const { user } = useSelector((state) => state.user);
  const [valueSearch, setValueSearch] = useState("");
  const [addFriends, setAddFriend] = useState([]);
  const [friends, setFriends] = useState([]);
  const [nameGroup, setNameGroup] = useState("");
  const nameGroupValidation = useRef();

  const handleChecked = (e, item) => {
    const { id, checked } = e.target;
    if (checked) {
      setAddFriend([...addFriends, item]);
    } else {
      setAddFriend(addFriends.filter((item) => item._id !== id));
    }
  };
  useEffect(() => {
    const getAllFriend = async () => {
      const response = await axios.get("/api/v1/auth/getAllFriend", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends([...response.data.friends]);
    };
    getAllFriend();
  }, [token]);

  const handleCloseTable = () => {
    dispatch(closeTableAdd());
  };

  const listIdFriendAdd = addFriends.map((item) => {
    return item._id;
  });

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (nameGroup.length < 1) {
      return (nameGroupValidation.current.style = `border: 2px solid red`);
    }
    try {
      const response = await axios.post(
        "/api/v1/conversation/createGroup",
        {
          listMemberAdd: listIdFriendAdd,
          nameGroup,
        },
        {
          headers: { Authorization: `Bearer ${token} ` },
        }
      );
      dispatch(
        selectRoom(response.data.conversation, { memberInGroup: addFriends })
      );
      socket.emit("create chat", response.data.conversation);
    } catch (error) {
      console.log(error, "error");
    }
    dispatch(closeTableAdd());
  };

  return (
    <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10">
      <div className="w-[40rem] p-6 bg-white relative">
        <div
          onClick={handleCloseTable}
          className="absolute right-4 top-4 p-2 cursor-pointer"
        >
          <FaTimes size={25} color="red"></FaTimes>
        </div>
        <div className="text-center font-bold text-[2rem]">Add members</div>
        <div className="mt-8 shadow bg-slate-300 p-4">
          {addFriends.map((item) => (
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
          {friends
            // eslint-disable-next-line array-callback-return
            .filter((item) => {
              if (user._id !== item._id)
                if (valueSearch === "") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(valueSearch.toLowerCase())
                ) {
                  return item;
                }
            })
            .map((item) => (
              <div className="flex justify-between items-center">
                <div className=" p-4 flex items-center  cursor-pointer ">
                  <div className="w-[5rem] h-[5rem] ">
                    <img
                      className="w-[100%] h-[100%] rounded-full object-cover"
                      src={item.avatar}
                      alt=""
                    />
                  </div>
                  <div className="ml-[3rem]">
                    <div className="font-bold mb-4">{item.name}</div>
                  </div>
                </div>
                <label key={item._id} htmlFor={item._id}>
                  <input
                    value={item.name}
                    onClick={(e) => handleChecked(e, item)}
                    id={item._id}
                    type="checkbox"
                    className="h-[25px] w-[25px] align-middle bg-[#1111]"
                  ></input>
                </label>
              </div>
            ))}
        </div>
        <div className="mt-[2rem] w-[100%] flex justify-between items-center">
          <div ref={nameGroupValidation} className="w-[75%]">
            <input
              onChange={(e) => setNameGroup(e.target.value)}
              value={nameGroup}
              placeholder="Name Group"
              className="border-2 border-[#2222] w-[100%] p-2"
              type="text"
            />
          </div>
          <button
            onClick={handleCreateGroup}
            className="bg-[#8244c1] text-white text-center h-12 flex-grow ml-4 p-2"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableAddGroup;
