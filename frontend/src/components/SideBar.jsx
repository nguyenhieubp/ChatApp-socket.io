import React from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { useSelector } from "react-redux";
const SideBar = () => {
  const navigation = useNavigate();
  const [option, setOption] = useState("AppChat");
  const { user } = useSelector((state) => state.user);
  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigation("/");
  };
  return (
    <>
      {user && (
        <div className="bg-[#4849a1] sm:w-auto w-[100vw] h-[100vh] flex flex-col items-center justify-between sm:py-[2rem] py-[4rem] rounded-tr-[2rem] rounded-br-[2rem] relative z-10">
          <Link to="/user">
            <div className="flex flex-col items-center">
              <div className="cursor-pointer rounded-full w-[8rem] h-[8rem] hover:bg-[#fff4]">
                <img
                  className="rounded-full w-full h-full object-cover"
                  src={user.avatar}
                  alt=""
                />
              </div>
              <div className="text-white mt-[2rem]">{user.name}</div>
            </div>
          </Link>
          <div>
            <div
              onClick={() => setOption("AppChat")}
              style={option === "AppChat" ? { background: "#fff4" } : {}}
              className="my-[2rem] cursor-pointer p-8 rounded-[1rem] hover:bg-[#fff4]"
            >
              <BiMessageAltDetail color="white" size={30}></BiMessageAltDetail>
            </div>
          </div>

          <div
            onClick={handleLogout}
            className="cursor-pointer p-8 rounded-[1rem] hover:bg-[#fff4]"
          >
            <BiLogOut color="white" size={30}></BiLogOut>
          </div>
        </div>
      )}
    </>
  );
};
export default SideBar;
