import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Group from "./Group";
import TableAddGroup from "./TableAddGroup";
import { openTableAdd } from "../redux/sliceOpenOption";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const socket = io(ENDPOINT);
const ListGroup = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const [listGroup, setListGroup] = useState([]);
  const { tableAdd } = useSelector((state) => state.open);
  const handleCreateTable = () => {
    dispatch(openTableAdd());
  };
  useEffect(() => {
    const getAllGroup = async () => {
      const response = await axios.get("/api/v1/conversation/getGroup", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListGroup(response.data);
    };
    getAllGroup();
  }, [token]);

  useEffect(() => {
    socket.on("get group", (data) => setListGroup([...listGroup, data]));
  });

  return (
    <>
      {tableAdd && (
        <div className="fixed  top-0 left-0 w-[100%] h-[100%] bg-[#bfb5b574] z-10 "></div>
      )}
      <div className="mt-[3rem] h-[590px] overflow-scroll overflow-x-hidden">
        <div
          onClick={handleCreateTable}
          className="flex justify-between items-center p-4 bg-pink-400 rounded-[2rem] cursor-pointer"
        >
          <div className="text-[2.2rem] font-bold">Create Group</div>
          <div className="p-[1rem] bg-[#4e464633] rounded-full ">
            <AiOutlinePlus size={25}></AiOutlinePlus>
          </div>
        </div>
        <div className="mt-[3rem]">
          {listGroup.map((item) => (
            <Group key={item._id} room={item}></Group>
          ))}
        </div>
      </div>
      {tableAdd && <TableAddGroup></TableAddGroup>}
    </>
  );
};

export default ListGroup;
