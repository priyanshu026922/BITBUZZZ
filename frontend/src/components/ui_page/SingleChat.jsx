import React, { useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
import { getSender, getSenderFull } from "../../chatLogic/getSender";
import Profile from "./Profile";
import UpdategroupChat from "../../chatLogic/UpdategroupChat";
import axios from "axios";
import { useEffect } from "react";
import ScrollableChat from "../UserAvatar/ScrollableChat";
import io from 'socket.io-client'
const ENDPOINT="http://localhost:5000";
let socket ,selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [message, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setnewMessage] = useState();
  const [socketConnect,setSocketConnect]=useState(false)
  const { user, selectedChat, setSelectedChat } = ChatState();
  const toast = useToast();
   const fetchmessage=async()=>{
     if(!selectedChat){
      return;
     }
     try{
      const config={
    headers:{
      Authorization:`Bearer ${user.token}`,
    },
    
  }
  setLoading(true)
     const {data}=await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`,
            config
     );
      setMessages(data)
      setLoading(false)
     }catch(e){
        toast({
        title: "Error occured",
        description:"Unable to fetch Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-middle",
      });
     }
   }
  const sendMessage =async (e) => {
if (e.key==="Enter"&&newMessage){
try{
  const config={
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${user.token}`,
    },
  };
  const {data}=await axios.post('http://localhost:5000/api/message',{
    content:newMessage,
    chatId:selectedChat._id
  },config)
  console.log(data)
  setnewMessage("");
  setMessages([...message,data]);
}catch(e){
  console.log(e.message)
  console.log(e.response)
 toast({
        title: "Error occured",
        description:"Failed to load Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-middle",
      });
}
}


  };

  useEffect(()=>{
    fetchmessage()
  },[selectedChat])
useEffect(() => {
  socket = io(ENDPOINT);               // connect to socket.io server
  socket.emit("setup", user);          // send setup event to server
  socket.on("connected", () => {       // listen for 'connected' confirmation
    setSocketConnect(true);            // update state when connected
  });
}, []);



  const typingHandler = (e) => {

    setnewMessage(e.target.value)

  };

  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="space-between" // 🟢 This allows top & bottom elements to align
      p={3}
      bg="white"
      width="100%"
      height="100%"
      borderRadius="lg"
    >
      {selectedChat ? (
        <>
          {/* 🔷 Top Chat Header */}
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="monospace"
            display="flex"
            alignItems="center"
            fontWeight="bold"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
              mr={2}
              aria-label="Back"
            />

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <Profile user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <Box display="flex" alignItems="center">
                {selectedChat.chatName.toUpperCase()}
                <UpdategroupChat
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchmessage={fetchmessage}
                />
              </Box>
            )}
          </Text>

          {/* 🔷 Message List Scrollable Area */}
          <Box
            flex="1" // 🟢 Occupy remaining height
            overflowY="auto"
            p={3}
            bg="#E8E8E8"
            w="100%"
            borderRadius="lg"
            mb={2} // add spacing before input box
          >
            {loading ? (
             <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%" // 🟢 ensures spinner centers vertically
    >
      <Spinner
        size="xl"
        width={20}
        height={20}
      />
    </Box>
            ) : (
             
               <Box
            display="flex"
              flexDir="column"
            overflowY="scroll"
          scrollbarWidth="none" 
        sx={{
           '&::-webkit-scrollbar': {
          display: 'none',
      },
    }}
  >
    <ScrollableChat messages={message}/>
  </Box>

            )}
          </Box>

          {/* 🔷 Input Box at Bottom */}
          <FormControl onKeyDown={sendMessage} isRequired mt={2}>
            <Input
              variant="filled"
              background="#E0E0E0"
              placeholder="Enter the message"
              onChange={typingHandler}
              value={newMessage}
            />
          </FormControl>
        </>
      ) : (
        // 🔷 Fallback View When No Chat is Selected
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          w="100%"
        >
          <Text fontSize="3xl" color="gray.500" fontFamily="monospace">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default SingleChat;
