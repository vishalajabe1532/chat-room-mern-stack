import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();

  useListenMessages();

  // const last
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    },150)
  }, [messages]);

  messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return loading ? (
    <span className="loading loading-spinner w-10 m-auto"></span>
  ) : (
    <div className="px- flex-1 overflow-auto">
      {messages.length ? (
        messages.map((message) => {
          return (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          );
        })
      ) : (
        <p className="text-center text-lg text-white">
          {" "}
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
