import React from 'react'
import { ChatState } from '../../context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';
const ChatSection = ({fetchAgain,setFetchAgain}) => {
  const {selectedChat}=ChatState();
  return (
 <Box
  display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
  alignItems="center"
  flexDir="column"
  p={3}
  bg="white"
  w={{ base: "100%", md: "68%" }}
  borderRadius="lg"
  borderWidth="1px"
  height="100%"
>
  <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
</Box>

  )
}



export default ChatSection
