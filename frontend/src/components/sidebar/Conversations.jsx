import React, { useEffect, useRef } from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis.js";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  // console.log("conversations", conversations);

  const { selectedConversation } = useConversation();

  const {onlineUsers} = useSocketContext();
  console.log("online Users",onlineUsers);

  const refMap = useRef(new Map());

  useEffect(() => {
    if (selectedConversation?._id) {
      const element = refMap.current.get(selectedConversation._id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "auto", block: "nearest" });
        }, 10);
      }
    }
  },[selectedConversation,conversations]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, index) => (
        <div
          ref={(el) => {
            if (el) {
              refMap.current.set(conversation._id,el);
            }
          }}
          key={conversation._id}
        >
          <Conversation
            lastIdx={index === conversations.length - 1}
            emoji={getRandomEmoji()}
            conversation={conversation}
            online={onlineUsers.includes(conversation._id)}
          />
        </div>
      ))}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Conversations;
