import {Server} from 'socket.io';
import http from 'http';
import express from 'express';


const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"https://chat-app-ipse.onrender.com",
        methods:["GET","POST"],
    }
});



export const getReceiverSocketId = (receiverid)=>{
    return userSocketMap[receiverid];
}




const userSocketMap = {};  //{userId:socketId}


io.on('connection',(socket)=>{
    console.log(`A user connected via socket id: ${socket.id}`)
    
    const userId = socket.handshake.query.userId;
    if(userId !== "undefined"){
        console.log(userId);
        userSocketMap[userId] = socket.id
    }


    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    
    
    socket.on('disconnect',()=>{
        console.log(`A user disconnected via socket id: ${socket.id}`)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})


export {app,io,server};