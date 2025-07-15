import { Box,Tooltip,Button ,Text, Menu,MenuList, MenuButton, Avatar, MenuItem, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, Stack, Skeleton, Spinner} from '@chakra-ui/react';
import React ,{useState} from 'react'
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons'
import { ChatState } from '../../context/ChatProvider';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';
import { useDisclosure} from "@chakra-ui/hooks"
import { Drawer } from "@chakra-ui/react"
import UserListItem from '../UserAvatar/userListItem';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

import ChatLoading from '../chatLoading';
const Sidebar = () => {
    const {isOpen,onOpen,onClose}=useDisclosure();
    const toast=useToast();
  const navigate=useNavigate();
    const {user,setUser,selectedChat,setSelectedChat,chats,setChats}=ChatState();
    const [search,setSearch]=useState("")
    const [searchRes,setSearchRes]=useState([]);
    const [loading,setLoading]=useState(false);
    const [loadingChat,setLoadingChat]=useState();

   const logoutH=()=>{
      localStorage.removeItem("userInfo");
      navigate("/")
   }


  const accessChat=async (userId)=>{
         try{
          setLoadingChat(true);
           const config={
    headers:{
      "Content-type":"application/json",
      Authorization:`Bearer ${user.token}`,
    },
  }
  const {data}=await axios.post("http://localhost:5000/api/chat",{userId},config);
  if(!chats.find((c)=>c._id===data._id)){
    setChats([data,...chats]);
  }
setLoadingChat(false);
setSelectedChat(data);
  onClose();
         }catch(e){
            toast({
        title: "Error fetching the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
         }
  }





const searchUser=async()=>{
if(!search){
 return   toast({
        title: "Please enter the field",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
}

try{
  setLoading(true);
  const config={
    headers:{
      Authorization:`Bearer ${user.token}`,
    },
  }
  const {data}=await axios.get(`http://localhost:5000/api/user?search=${search}`,config);
  setLoading(false);
  setSearchRes(data);
}catch(e){
     setLoading(false);
   toast({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
}
}
  return (
    <Box display='flex' justifyContent="space-between"alignItems="center" bg="white" w="100%" p={"5px 10px 5px 10px"} borderWidth={"5px"}>
     <Tooltip label ="Search Users to chat" hasArrow placement="bottom-end">
    <Button onClick={onOpen} variant="ghost" m={2} p={2} size="sm">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" style={{ width: "32px", height: "37px" ,color: "black" }} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
<Text display={{base:"none",md:"flex"}} ml={2} fontSize="sm">Search User</Text>
     </Button></Tooltip>
     <Text fontSize={'3xl'}fontWeight={'extrabold'}fontStyle={'italic'}textColor={"blackAlpha.900"}>CHIT-BIT</Text>
   <div>
    <Menu>
        <MenuButton p={1} px={2}>
            <BellIcon fontSize={"2xl"}></BellIcon>
        </MenuButton>
    </Menu>
    <Menu>
         <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
            <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic}/>
        </MenuButton>
        <MenuList>
            <Profile user={user}>
           <MenuItem>My Profile</MenuItem>
            </Profile>
             <MenuItem onClick={logoutH}>Log out</MenuItem>
        </MenuList>
    </Menu>
   </div>
   
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay/>
      <DrawerContent>
      <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
      <DrawerBody>
    <Box display="flex" pb={2}>
    <Input 
    placeholder="Search by name or Email"
    mr={2}
    value={search}
    onChange={(e)=>{
      setSearch(e.target.value)
    }}
    />
    <Button onClick={searchUser}colorScheme='blue'>Go</Button>
   </Box>
   {loading?(
     <Stack>
     <ChatLoading/>
     </Stack>
   ):(
searchRes?.map(user=>(
  <UserListItem
  key={user._id}
  user={user}
  handleFunction={()=>accessChat(user._id)}
  />
))
   )}
   {loadingChat && <Spinner ml="auto" display="flex"/>}
   </DrawerBody>
      </DrawerContent>

    </Drawer>
   
    </Box>
  )
}

export default Sidebar