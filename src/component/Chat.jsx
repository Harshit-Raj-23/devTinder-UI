import React from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { targetUserId } = useParams();
  console.log(targetUserId);

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 bg-neutral border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      </div>
      <div className="p-5 bg-neutral border-t border-gray-600 flex items-end gap-2">
        <input className="flex-1 border border-gray-500 text-white rounded p-2 opacity-30" />
        <button className="btn btn-primary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
