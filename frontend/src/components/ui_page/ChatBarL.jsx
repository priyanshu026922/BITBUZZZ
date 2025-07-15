import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {getSender} from "../../chatLogic/getSender"
import ChatLoading from '../chatLoading';
import { Button } from "@chakra-ui/react";
import { ChatState } from '../../context/ChatProvider';
import GroupChatModal from "../../chatLogic/GroupChatModal";
const ChatBarL= ({fetchAgain,setFetchAgain}) => {
    const [logUser,setLogUser]=useState();
    const {user,selectedChat,setSelectedChat,chats,setChats}=ChatState();
    const toast=useToast();

const fetchChats=async()=>{
    try{
     const config={
           headers:{
             Authorization:`Bearer ${user.token}`,
           },
         }

         const {data}=await axios.get(`http://localhost:5000/api/chat`,config);
         console.log("Fetched chats from backend:", data);///1st
         setChats(data);
    }catch(e){
          toast({
        title: "Error occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
};

useEffect(()=>{
    setLogUser(JSON.parse(localStorage.getItem("userInfo")));
  fetchChats();
},[fetchAgain]);

  return (
     <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      padding={3}
      bg="white"
      width={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
        height="100vh" 
    >

      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal setFetchAgain={setFetchAgain}>
           <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
         
          </Box>
          <Box  d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        width="100%"
        height="100%"
        borderRadius="lg"
        overflowY="hidden">
          {chats?(
             <Stack  maxHeight="70vh" >
            {chats.map((chat) => (
              <Box
              key={chat._id}
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat?._id === chat._id ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat?._id === chat._id ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
              >

                <Text>
                  {!chat.isGroupChat
                    ? getSender(logUser, chat.users)
                    : chat.chatName|| "Unnamed Group"}
                </Text>
              </Box>
            ))}
          </Stack>
          ):(
              <ChatLoading/>
          )}
      </Box>
      </Box>


  )
}
export default ChatBarL;
