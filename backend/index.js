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
app.listen(PORT)