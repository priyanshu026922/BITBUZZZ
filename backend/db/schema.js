const mongoose=require('mongoose');
const bcrypt=require("bcryptjs");
const chatSchema=mongoose.Schema(
    {
        chatName:{
            type:String,
            trim:true,
        },
        isGroupChat:{
            type:Boolean,
            default:false
        },
        users:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            },
        ],
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message"
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },

    },{
        timestamps:true
    }
);

const messageSchema=mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        trim:true,
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }
},{
    timestamps:true,
})

const userSchema=mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true},
password:{type:String,required:true},
pic:{
    type:String,
    default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
}
},{
    timestamps:true,
})

userSchema.pre('save',async function(next){
    
    if(!this.modified){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

userSchema.methods.matchPassword=async function(P){
    return await bcrypt.compare(P,this.password);
}

const Message=mongoose.model("message",messageSchema);
const Chat=mongoose.model("chat",chatSchema);
const  User = mongoose.model("user", userSchema)
module.exports={
    Chat,
    Message,
    User
};