import React from "react";
import { Box, IconButton, Text, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
import { getSender, getSenderFull } from "../../chatLogic/getSender";
import Profile from "./Profile";
import UpdategroupChat from "../../chatLogic/UpdategroupChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const toast = useToast();

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="space-between"
      p={3}
      bg="white"
      w="100%"
      h="100%"
      borderRadius="lg"
    >
      {selectedChat ? (
        <>
          {/* Top Bar */}
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
           />
       </Box>
     )}
          </Text>

          {/* Messages Area */}
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="auto"
          >
            {/* Messages would go here */}
          </Box>

          {/* Message Input Area */}
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            w="100%"
          >
            {/* Message input + send button would go here */}
            {/* Example: after sending a message, trigger setFetchAgain(!fetchAgain) */}
          </Box>
        </>
      ) : (
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
