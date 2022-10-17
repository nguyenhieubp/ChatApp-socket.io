import React from "react";
import SideBar from "../components/SideBar";
import MainChat from "../components/MainChat";
import Conversation from "../components/Conversation";
import { GrMenu } from "react-icons/gr";
import { useState } from "react";
const AppChat = () => {
  const [menu, setMenu] = useState(false);
  return (
    <div className="grid grid-cols-10 relative ">
      <div
        onClick={() => setMenu(!menu)}
        className="block sm:hidden p-4 absolute z-30"
      >
        <GrMenu color="white" size={28}></GrMenu>
      </div>
      {menu && <SideBar></SideBar>}
      <div className="hidden sm:block col-span-1">
        <SideBar></SideBar>
      </div>
      <div className="block sm:hidden">
        <MainChat></MainChat>
      </div>
      <div className="hidden sm:block col-span-2">
        <MainChat></MainChat>
      </div>
      <div className=" sm:hidden fixed top-0 left-0 w-full h-full ">
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold mb-[2rem]">INSTALL APP</div>
            <img
              src="https://images.unsplash.com/photo-1665667593232-6d74fc446797?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
              alt=""
            />
          </div>
        </div>{" "}
        *
      </div>
      <div className=" sm:col-span-7  ">
        <Conversation></Conversation>
      </div>
    </div>
  );
};

export default AppChat;
