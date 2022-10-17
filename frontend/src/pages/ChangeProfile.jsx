import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
const ChangeProfile = () => {
  const token = localStorage.getItem("Token");
  const { user } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };
  const handleChangeProfile = async () => {
    try {
      await axios.put(
        `api/v1/auth/update/${user._id}`,
        {
          email,
          password,
          name,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-[#8a7f7f33]"></div>
      <div className="fixed p-8 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[30rem] bg-white shadow">
        <div className="text-center font-bold text-[2.2rem]">
          Change Profile User
        </div>
        <div className="mt-[2rem] ">
          <div className="mb-[2rem] flex items-center">
            <input
              onChange={handleChangeAvatar}
              id="avatarUser"
              className="hidden"
              placeholder="Name"
              type="file"
            />

            <label htmlFor="avatarUser">
              <div>
                <img
                  className="w-[6rem] h-[6rem] rounded-full object-cover"
                  src={avatar.preview ? avatar.preview : avatar}
                  alt=""
                />
              </div>
            </label>
            <label className="ml-[2rem]" htmlFor="avatarUser">
              <BsPencilSquare size={20}></BsPencilSquare>
            </label>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-8 w-full border-2 border-black p-2"
            placeholder="Name"
            type="text"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-8 w-full border-2 border-black p-2"
            placeholder="Email"
            type="text"
          />
          <input
            aria-hidden
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-8 w-full border-2 border-black p-2"
            placeholder="Password"
            type="text"
          />
          <button
            onClick={handleChangeProfile}
            className="bg-[#8244c1] text-white p-4"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfile;
