import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { BiLockAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserCurrent } from "../redux/sliceCurrentUser";
import axios from "axios";
const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [validation, setValidation] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/v1/auth/login", {
        email: valueEmail,
        password: valuePassword,
      });
      localStorage.setItem("Token", response.data.token);
      dispatch(getUserCurrent(localStorage.getItem("Token")));
      navigation("/appChat");
    } catch (error) {
      setValidation(error.response.data.message);
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-[#f5f2ea] px-[2rem] sm:px-[4rem] sm:py-[4rem]">
      <div className="flex justify-between items-center">
        <Link to="/">
          <div className="text-[3rem] font-bold">App Chat</div>
        </Link>
        <div className="flex items-center">
          <div className="mr-[3rem] ">SigUp</div>
          <Link to="/register">
            <button className="px-[2rem] py-[1rem] bg-[#fdc886] rounded-[1rem] ">
              Register
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center mt-[10rem] ">
        <div className="shadow w-[50rem] sm:w-[40rem]  bg-white px-[3rem] pt-[4rem] rounded-[1rem] pb-[3rem]">
          <div className="text-center font-bold text-[2rem]">Login</div>
          <div className="mt-6 text-center leading-8">
            Hey ,Enter your details to get sign in to your account
          </div>
          <div className="mt-[4rem]">
            {validation && (
              <div className="text-red-600 mb-8">{validation}</div>
            )}
            <form>
              <div className="relative">
                <input
                  onChange={(e) => setValueEmail(e.target.value)}
                  value={valueEmail}
                  className="pl-3 pr-14 border-[#3333] border-2 w-[100%] text-[2rem] mb-6 rounded-[0.75rem] py-2"
                  placeholder="Email"
                  type="text"
                />
                <FiMail size={25} className=" absolute top-2 right-1"></FiMail>
              </div>
              <div className="relative">
                <input
                  onChange={(e) => setValuePassword(e.target.value)}
                  value={valuePassword}
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
                Sign in
              </button>
            </form>
          </div>
          <div className="my-[2rem]  w-[100%] h-1 bg-[#111] "></div>
          <div className="text-center">
            You don't have account ?
            <Link to="/register">
              <b className="cursor-pointer">Register Now</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
