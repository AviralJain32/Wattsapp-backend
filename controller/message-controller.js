import message from "../model/message.js";
import Conversation from "../model/conversation.js";
export const newMessage=async(req,res)=>{
    try{
        const newMessages =new message(req.body);
        await newMessages.save();
        await Conversation.findByIdAndUpdate(req.body.conversationId,{message:req.body.text})
        return res.status(200).json('message have been sent successfully');
    }
    catch(e){
        return res.status(500).json(e.message);
    }
}
export const getMessage=async(req,res)=>{
    try{
        const messages= await message.find({conversationId:req.params.id});
        return res.status(200).json(messages);
    }
    catch(e){
        return res.status(500).json(e.message);
    }
}