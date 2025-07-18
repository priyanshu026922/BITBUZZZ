const express=require("express");
const {notFound,errorHandler}=require("./middleware/errorMiddleware")
const dotenv = require('dotenv');
dotenv.config();

const app=express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const userRoutes=require("./routes/userRoutes");
const chatRoutes=require("./routes/chatRoutes");
const messageRoutes=require("./routes/messageRoutes")
const connectDB = require('./config/db');
connectDB(); 

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT=process.env.PORT||3000
const server=app.listen(PORT,()=>{
    console.log("running")
})

const io=require("socket.io")(server,{
    pingTimeout:50000,
    cors:{
        origin:"http://localhost:5000"
    },
});

io.on("connection",(socket)=>{
  console.log("connected")
  socket.on('setup',(userData)=>{
    socket.join(userData._id);
    console.log(userData._id)
    socket.emit('connected');
  })
}); 