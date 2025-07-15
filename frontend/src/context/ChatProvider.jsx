import { createContext, useState,useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useContext } from 'react';

const  Chatcontext=createContext();

export const ChatProvider=({children})=>{
    const [user,setUser]=useState();
    const [selectedChat,setSelectedChat]=useState();
    const [chats,setChats]=useState([]);

   const navigate=useNavigate();
    useEffect(()=>{
       const userInfo=JSON.parse(localStorage.getItem("userInfo"));
       setUser(userInfo);
       if(!userInfo){
        navigate("/")
       }

    },[navigate])
    return <Chatcontext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats}}>{children}</Chatcontext.Provider>;
};

export const ChatState=()=>{return useContext(Chatcontext);}

