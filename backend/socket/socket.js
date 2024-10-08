import {Server} from 'socket.io';
import http from 'http';
import express from 'express';


const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
  });

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:'*',
        methods:["GET","POST"],
        credentials:true,
    },
    allowEIO3: true,

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