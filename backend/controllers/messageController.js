const Chat = require("../db/chatSchema");
const Message=require("../db/messageSchema");
const User = require("../db/userSchema");
const sendMessage=(async(req,res)=>{
  const {content,chatId}=req.body;
 if(!content||!chatId){
    return res.sendStatus(400);
 }
var newMessage={
    sender:req.user._id,
    content:content,
chat:chatId
}

try{
  var message=await Message.create(newMessage);
  message=await message.populate("sender","name pic");
  message=await message.populate("chat");
  message=await User.populate(message,{
    path:'chat.users',
    select:"name pic email"

  });

  await Chat.findByIdAndUpdate(req.body.ChatId,{
    latestMessage:message._id
  })
  res.json(message);

}catch(e){
   return res.status(400).json({
    message:e.message
   })
}
}
 
);

const allMessage=(async(req,res)=>{
try{
    const messages=await Message.find({chat:req.params.chatId})
    .populate("sender","name pic email")
    .populate("chat");
      res.json(messages);
}catch(e){
console.log(e.message);
   return res.status(400).json({
    message:e.message
   })
}
})






module.exports={sendMessage,allMessage};