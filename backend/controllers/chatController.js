const Chat=require("../db/chatSchema");
const User=require("../db/userSchema")
const accessChat= async(req,res)=>{

  const {userId}=req.body;
  if(!userId){
    res.status(400);
    return res.json({
        message:"No such user exists"
    })
  }
  
  
let isChat=await Chat.find({
     isGroupChat:false,
    $and:[
       {users:{
         $elemMatch:{$eq:req.user._id}
       }},
       {users:{
         $elemMatch:{$eq:userId}
       }},
    ],
  }).populate("users","-password").populate("latestMessage")

  isChat = await User.populate(isChat, {
  path: 'latestMessage.sender',
  select: 'name pic email'
});
  if(isChat.length>0){
   return  res.send(isChat[0]);
  }
else{
let chatData={
    chatName:"sender",
    isGroupChat:false,
    users:[req.user._id,userId]
  };

  try {
    const createChat=await Chat.create(chatData);
    const FullChat=await Chat.findOne({
        _id:createChat._id
    }).populate(
        "users",
        "-password"
    );
    res.status(200).json(FullChat);
  }catch(e){
    res.status(400);
    return res.json({
        message:e.message
    })
  }



}
  
}

const fetchChats=async (req,res)=>{
    try{
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")

        .then(async (results)=>{
            results=await User.populate(results,{
                path:"latestMessage.sender",
                select:"name pic email",
            });
            res.status(200).send(results);
        });
    }catch(e){
       res.status(400);
       res.json({
        message:e.message
       })
    }
}

const creategroupChat=async(req,res)=>{
    if(!req.body.users||!req.body.name){
        res.status(400);
        return res.json({
            message:"Please Fill all the fields"
        })
    }
    var users=JSON.parse(req.body.users);
    if(users.length<2){
        return res.status(400).send("More than 1 user required")
    }
     users.push(req.user);
    try{
        const groupchat=await Chat.create({
             chatName:req.body.name,
              users:users,
            isGroupChat:true,
            groupAdmin:req.user,
        });
        const fullGroupChat=await Chat.findOne({_id:groupchat._id})
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        
        res.status(200).json(fullGroupChat);
    }catch(e){
     return res.json({
      message:"  something went wrong"
     })
    }
}


const renameGroup=async (req,res)=>{
    const {chatId,chatName}=req.body;
    const updated=await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new:true,
        }
    )
    .populate("users","-password")
    .populate("groupAdmin","-password");
    if(!updated){
        res.status(404);
        return res.json({
            message:"Chat Not Found"
        })
    }else{
        return res.json(updated)
    }
}


const addGroup=async(req,res)=>{
const {userId,chatId}=req.body;

const added=await Chat.findByIdAndUpdate(
    chatId,
    {
        $push:{users:userId}
    },{
        new:true
    }
)
.populate("users","-password")
.populate("groupAdmin","-password");
   if(!added){
    return res.status(404).json({
        message:"No updation done"
    })
   }else{
    res.json(added)
   }
}
const removeFromGroup=async(req,res)=>{
const {userId,chatId}=req.body;

const removed=await Chat.findByIdAndUpdate(
    chatId,
    {
        $pull:{users:userId}
    },{
        new:true
    }
)
.populate("users","-password")
.populate("groupAdmin","-password");
   if(!removed){
    return res.status(404).json({
        message:"No updation done"
    })
   }else{
    res.json(removed)
   }
}
module.exports={accessChat,fetchChats,creategroupChat,renameGroup,addGroup,removeFromGroup};