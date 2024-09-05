import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notification from '../assets/sounds/notification.mp3'

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        const audio = new Audio(notification); // Specify the audio file path
        audio.play(); // Play the audio
      setMessages([...messages, newMessage]);
    });


    return ()=>{
        socket?.off("newMessage")
    }
  }, [socket,messages]);
};

export default useListenMessages;
