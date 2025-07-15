import React ,{useState}from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react';
import Sidebar from '../components/ui_page/Sidebar';
import ChatBarL from '../components/ui_page/ChatBarL';
import ChatSection from '../components/ui_page/ChatSection';
const ChatPage = () => {
  const {user}=ChatState();
  const [fetchAgain,setFetchAgain]=useState(false);
  return (
    <div style={{width:"100%"}}>
      {user?(
        <div>
      <Sidebar/>
         <Box
        display="flex"
         justifyContent={'space-between'}
        w="100%"
        h="96"
        p="10px"
      >
        
       {user&&<ChatBarL fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
        {user&&<ChatSection fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
      </div>
      ):null}
    </div>
  )
}

export default ChatPage
