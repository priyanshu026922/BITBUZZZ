import React from 'react';
import { 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  Container, 
  Box, 
  Text 
} from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Homepage = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("userInfo"));
    if(user){
      navigate("/chats");
    }
  },[history]);
  return (
    <div>
      <Container maxW="xl" centerContent>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text fontSize="4xl" fontWeight="extrabold">
            CHITBIT
          </Text>
        </Box>

        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs variant="soft-rounded" isFitted>
            <TabList mb="1em">
              <Tab>SIGNIN</Tab>
              <Tab>SIGNUP</Tab>
            </TabList>
              
            <TabPanels>
              <TabPanel>
               <Login/>
              </TabPanel>
              <TabPanel>
                 <Signup/>
              </TabPanel>
              
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
};

export default Homepage;
