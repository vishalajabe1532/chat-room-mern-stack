import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'


const SocketContext = createContext();


export const useSocketContext = ()=>{
    return useContext(SocketContext);
}


export const SocketContextProvider=({children})=>{
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();


    useEffect(()=>{
        if(authUser){
            const newSocket = io("https://chat-app-ipse.onrender.com",{
                query:{
                    userId:authUser._id,

                }
            });

            setSocket(newSocket);


            newSocket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            })

            return ()=>{
                // console.log('unmounted should be closed')
                newSocket.close();
            }
        }else{
            // console.log("no auth user")
            // console.log("socket",socket)
            if(socket){
                // console.log("socket should be closed")
                socket.close();
                setSocket(null);
            }
        }
    },[authUser])

    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
    )
};