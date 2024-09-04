import React from "react";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const Message = ({message}) => {
  const {selectedConversation} = useConversation();
  const {authUser} = useAuthContext();
  const fromMe  = message.senderId === authUser._id
  const createdAt = new Date(message.createdAt);

  // Format the date
  const formattedDate = `${String(createdAt.getHours()).padStart(2, '0')}:${String(createdAt.getMinutes()).padStart(2, '0')} ${String(createdAt.getDate()).padStart(2, '0')}-${String(createdAt.getMonth() + 1).padStart(2, '0')}-${createdAt.getFullYear()}`;

  return (
    <div>
      <div className={`chat ${fromMe? "chat-end" : "chat-start"} `}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={fromMe? authUser.profilePic : selectedConversation.profilePic}
            />
          </div>
        </div>
        <div className={`chat-bubble text-white ${fromMe ? "bg-blue-500":""}`}>{message.message}</div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedDate}</div>
      </div>
    </div>
  );
};

export default Message;
