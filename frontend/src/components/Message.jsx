import React from "react";
import { useSelector } from "react-redux";
import FriendChat from "./FriendChat";
import MyChat from "./MyChat";
import { useRef } from "react";
import { useEffect } from "react";
const Message = ({ messages }) => {
  const chatRef = useRef();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages.length]);
  return (
    <div ref={chatRef} className="h-[550px] overflow-x-hidden overflow-scroll">
      {messages &&
        messages.map((item) =>
          item.sender._id === user._id ? (
            <div className="mt-[3rem]" key={item._id}>
              <MyChat
                time={item.time}
                sender={item.sender}
                avatar={user.avatar}
                text={item.text}
              ></MyChat>
            </div>
          ) : (
            <div className="mt-[3rem]" key={item._id}>
              <FriendChat
                time={item.time}
                sender={item.sender}
                avatar={item.sender.avatar}
                text={item.text}
              ></FriendChat>
            </div>
          )
        )}
    </div>
  );
};

export default Message;
