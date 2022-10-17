import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const User = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      {user && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-[#8a7f7f33]"></div>
          <div className="fixed w-[50rem] p-8 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  bg-white shadow">
            <div className="mb-[3rem] w-[10rem] h-[10rem] mx-auto">
              <img
                className="w-full h-full rounded-full"
                src={user.avatar}
                alt=""
              />
            </div>
            <div className="text-center font-bold text-[2.2rem]">
              {user.name}
            </div>
            <div className="mt-[2rem]">
              <div className="text-[#cdd0d6]">Email: </div>
              <div className="mt-[1rem] font-bold">{user.email}</div>
            </div>
            <div className="mt-[2rem]">
              <div className="text-[#cdd0d6]">Password: </div>
              <div className="mt-[1rem] font-bold">........</div>
            </div>
            <Link to="/changeProfile">
              <button className="p-4 bg-violet-600 text-white mt-10">
                Change
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
