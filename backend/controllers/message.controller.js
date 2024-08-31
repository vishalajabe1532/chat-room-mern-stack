

import mongoose from 'mongoose'
import Message from '../models/message.model.js'
import User from '../models/user.model.js';
import Conversation from '../models/conversation.model.js'




export const sendMessage= async (req,res)=>{
    console.log(`Send message route`);


    try{

        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id

        if (!mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ error: "Invalid receiver ID format" });
        }

        const receiver = await User.findById(receiverId)

        if(!receiver){
            res.status(404).json({error:"Receiver does not exists"});
        
        }



        let conversation = await Conversation.findOne({
            participants :{$all:[senderId,receiverId]},
        })

        if(!conversation){
            //sending message first time
            conversation = await Conversation.create({
                participants:[senderId,receiverId],

            })
            
        }




        const newMessage = await Message({
            senderId,
            receiverId,
            message
        })

        if(!newMessage){
            res.status(400).json({error:"Invalid Message data"});
        }
        

        conversation.messages.push(newMessage._id);




        //socket.io functionality will go here

        
        //saving message 
        // await conversation.save()
        // await newMessage.save()
        // here second will start after completion of first 

        //this will run in parallel
        await Promise.all([conversation.save(),newMessage.save()])



        console.log(`message sent`)
        res.status(201).json({newMessage})

    }
    catch(err){
        console.log(`Error in getting messages ${err.message}`)
        res.status(500).json({error:"Internal server error"});
    }


}



export const getMessages = async (req,res)=>{
    try{
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;



        if (!mongoose.Types.ObjectId.isValid(userToChatId)) {
            return res.status(400).json({ error: "Invalid user to chat ID format" });
        }

        const receiver = await User.findById(userToChatId)

        if(!receiver){
            res.status(404).json({error:"User to chat with does not exists"});
        
        }


        const conversation = await Conversation.findOne({participants:{$all:[senderId,userToChatId]}}).populate("messages")

       if(!conversation){
        return res.status(200).json([])
       }

       const messages = conversation.messages;



        res.status(200).json(messages);

    }
    catch(err){
        console.log(`Error in sending message ${err.message}`)
        res.status(500).json({error:"Internal server error"});
    }
}