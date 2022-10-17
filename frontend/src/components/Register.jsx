import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { BiLockAlt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { getUserCurrent } from "../redux/sliceCurrentUser";
import { useDispatch } from "react-redux";
const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [valueName, setValueName] = useState("");
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [validation, setValidation] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/v1/auth/register", {
        name: valueName,
        email: valueEmail,
        password: valuePassword,
      });
      localStorage.setItem("Token", response.data.token);
      dispatch(getUserCurrent(localStorage.getItem("Token")));
      navigation("/");
    } catch (error) {
      if (
        !valueEmail.match(
          // eslint-disable-next-line no-useless-escape
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        )
      ) {
        return setValidation("Email not validation");
      }
      if (valuePassword.length < 8) {
        return setValidation("password short");
      }
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-[#f5f2ea] px-[2rem] sm:px-[4rem] sm:py-[4rem]">
      <div className="flex justify-between items-center">
        <Link to="/">
          <div className="text-[3rem] font-bold">App Chat</div>
        </Link>
        <div className="flex items-center">
          <Link to="/">
            <button className=" px-[2rem] py-[1rem] bg-[#fdc886] rounded-[1rem] ">
              SigUp
            </button>
          </Link>
          <div className=" ml-[3rem]">Register</div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-[10rem] ">
        <div className="shadow w-[50rem] sm:w-[40rem]  bg-white px-[3rem] pt-[4rem] rounded-[1rem] pb-[3rem]">
          <div className="text-center font-bold text-[2rem]">Register</div>
          <div className="mt-6 text-center leading-8">
            Hey ,Enter your details to get sign in to your account
          </div>
          <div className="mt-[4rem]">
            <div className="text-red-600 mb-6">{validation}</div>
            <form>
              <div className="relative">
                <input
                  value={valueName}
                  onChange={(e) => setValueName(e.target.value)}
                  className="pl-3  pr-14 border-[#3333] border-2 w-[100%] text-[2rem] mb-6 rounded-[0.75rem] py-2"
                  placeholder="Name"
                  type="text"
                />
                <FaRegUser
                  size={25}
                  className=" absolute top-2 right-1"
                ></FaRegUser>
              </div>
              <div className="relative">
                <input
                  value={valueEmail}
                  onChange={(e) => setValueEmail(e.target.value)}
                  className="pl-3 pr-14 border-[#3333] border-2 w-[100%] text-[2rem] mb-6 rounded-[0.75rem] py-2"
                  placeholder="Email"
                  type="text"
                />
                <FiMail size={25} className=" absolute top-2 right-1"></FiMail>
              </div>
              <div className="relative">
                <input
                  value={valuePassword}
                  onChange={(e) => setValuePassword(e.target.value)}
                  className="pl-3 pr-14 border-[#3333] border-2 w-[100%] text-[2rem] mb-6 rounded-[0.75rem] py-2"
                  placeholder="Password"
                  type="password"
                />
                <BiLockAlt
                  size={25}
                  className="absolute top-2 right-1"
                ></BiLockAlt>
              </div>
              <button
                onClick={handleSubmit}
                className="w-[100%] bg-[#fdc886] text-center py-[1rem] rounded-[1rem] font-bold"
              >
                Register
              </button>
            </form>
          </div>
          <div className="my-[2rem]  w-[100%] h-1 bg-[#111] "></div>
          <div className="text-center">
            You have account ?
            <Link to="/">
              <b className="cursor-pointer">Login Now</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
