import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ListGroup from "./ListGroup";
import { IoIosArrowRoundBack } from "react-icons/io";
const MainChat = () => {
  const [search, setSearch] = useState(false);
  return (
    <div className="sm:shadow h-[100vh] px-[3rem] py-[2rem]">
      {search ? (
        <div className="relative w-full mt-[4rem] ml-4">
          <div className="absolute left-2 top-0 p-2 ">
            <FaSearch size={20} color="#bcbdbf"></FaSearch>
          </div>
          <input
            type="text"
            className="border-2 w-[32rem] sm:w-full  border-[#3333] p-2 rounded-[1rem] pl-16 pr-16"
          />
          <div
            onClick={() => setSearch(false)}
            className="absolute right-[-3rem] top-[50%] p-2  translate-x-[-50%] translate-y-[-50%]"
          >
            <div className="p-2 cursor-pointer">
              <IoIosArrowRoundBack size={30}></IoIosArrowRoundBack>
            </div>
          </div>
        </div>
      ) : (
        <div className="sm:w-auto w-[88vw] mt-[3rem]">
          <div className="flex justify-between items-center ">
            <div className="text-[2.2rem] font-bold">Message</div>
            <div
              onClick={() => setSearch(true)}
              className="cursor-pointer p-4 rounded-[2rem] bg-[#efe1f5]"
            >
              <FaSearch size={20}></FaSearch>
            </div>
          </div>
        </div>
      )}
      <div className="hidden sm:flex relative mt-[3rem]  justify-between items-center ">
        <div className=" font-bold flex-grow before:block before:absolute before:content-[''] before:w-[4rem] before:h-2 before:top-[2rem] before:left-0  before:bg-[#5f60ad] before:rounded-[1rem] cursor-pointer ">
          Chat
        </div>
      </div>

      <ListGroup></ListGroup>
    </div>
  );
};

export default MainChat;
