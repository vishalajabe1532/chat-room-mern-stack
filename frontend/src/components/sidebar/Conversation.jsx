import React from "react";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ conversation, emoji, lastIdx ,online}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  // console.log(isSelected)

  const handleClick = () => {
    // console.log(conversation);
    setSelectedConversation(conversation);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected && "bg-sky-500"
        }`
         
      }
      >
        <div className={`avatar ${online?"online":""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.username}</p>
            <span className="text-xl ">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIdx ? <div className="divider my-0 py-0 h-1"></div> : null}
    </>
  );
};

export default Conversation;
