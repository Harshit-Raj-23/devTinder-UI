import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [newMessage, SetNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat?.data?.messages);

    const chatMessages = chat?.data?.messages.map((message) => {
      const { senderId, text } = message;
      return {
        firstName: senderId.firstName,
        lastName: senderId.lastName,
        photoUrl: senderId.photoUrl,
        text,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
      userId,
      targetUserId,
      text: newMessage,
    });

    SetNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 bg-neutral border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-y-scroll p-5">
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === message.firstName
                  ? "chat-end"
                  : "chat-start")
              }
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={message?.photoUrl}
                  />
                </div>
              </div>
              <div className="chat-header">
                {`${message?.firstName} ${message?.lastName}`}
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">{message.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 bg-neutral border-t border-gray-600 flex items-end gap-2">
        <input
          value={newMessage}
          onChange={(e) => SetNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
