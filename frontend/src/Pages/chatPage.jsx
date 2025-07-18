import React, { useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../components/ui_page/Sidebar';
import ChatBarL from '../components/ui_page/ChatBarL';
import ChatSection from '../components/ui_page/ChatSection';

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <Flex  w="100%" h="100vh">
    <Box style={{ overflow:"auto",width: '100%', height: '100vh' }}>
      {user && (
        <Box
          display="flex"
          flexDir="column"
          height="100%"
        >
          <Sidebar />
          <Box
            display="flex"
            justifyContent="space-between"
            w="100%"
            h="100%"
            p="10px"
            overflow="hidden"
          >
            <ChatBarL fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            <ChatSection fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </Box>
        </Box>
      )}
    </Box>
    </Flex>
  );
};

export default ChatPage;
