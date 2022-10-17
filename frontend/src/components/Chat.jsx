import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const socket = io(ENDPOINT);
let roomCompare;
const Chat = () => {
  const { user } = useSelector((state) => state.user);
  const { room } = useSelector((state) => state.room);
  const [text, setText] = useState("");
  const token = localStorage.getItem("Token");
  const [messages, setMessages] = useState([]);
  const roomId = room._id;

  useEffect(() => {
    const getMessage = async () => {
      const response = await axios.get(`/api/v1/message/get/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data.conversation);
    };
    socket.emit("join room", roomId);
    getMessage();
  }, [roomId, token]);

  useEffect(() => {
    socket.on("getMessage", (newMessage) => {
      if (!roomCompare || roomCompare !== newMessage.conversation) {
      } else {
        setMessages([...messages, newMessage]);
      }
    });
  });
  // });

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      if (text.length === 0) return;
      const response = await axios.post(
        "/api/v1/message/send",
        {
          sender: user._id,
          conversation: room._id,
          text: text,
          time: new Date(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages([...messages, response.data.message]);
      socket.emit("new message", response.data.message);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTyping = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <div className="h-[645px] px-[4rem] relative">
        <div className="pt-[2rem] ">
          <Message messages={messages}></Message>
        </div>
        <form
          className="absolute bottom-4  left-12 w-[92%] flex items-center justify-between"
          onSubmit={handleSendMessage}
        >
          <input
            value={text}
            onChange={(e) => handleTyping(e)}
            className="w-[92%] border-[0.1rem] border-black px-2 py-4 text-[2rem] rounded-[2rem]"
            type="text"
          />
          <div
            onClick={handleSendMessage}
            className="p-4 bg-[#ececf5] rounded-full cursor-pointer"
          >
            <AiOutlineSend size={30} color="#5354a6"></AiOutlineSend>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
