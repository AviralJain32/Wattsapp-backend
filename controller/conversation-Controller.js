import Conversation from "../model/conversation.js";

export const newConversation=async(req,res)=>{
    try{
        const senderId=req.body.senderId;
        const recieverId=req.body.recieverId;
        // console.log("sender id",senderId,"reciever id",recieverId);
        const exist= await Conversation.find({members:{$all:[recieverId,senderId]}});
        if (exist.lenght>0){
            return res.status(200).json("conversation already exists");
        }
        const newConversation=new Conversation({
            members:[senderId,recieverId]
        })
        await newConversation.save();
        return res.status(200).json("conversation saved successfully")
    }
    catch(e){
        return res.status(500).json(e.message);
    }
}

export const getConversation=async(req,res)=>{
    try{
        const senderId=req.body.senderId;
        const recieverId=req.body.recieverId;
        // console.log("sender id",senderId,"reciever id",recieverId);
        let conversation=await Conversation.findOne({members:{$all:[senderId,recieverId]}});
        // console.log("get conversation controller",conversation);
        return res.status(200).json(conversation);
    }
    catch(e){
        return res.status(500).json(error.message);
    }
}