import React ,{useState}from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  useToast,
  FormControl,
  Input,Box
} from '@chakra-ui/react'
import { ChatState } from '../context/ChatProvider';
import axios from 'axios';
import UserListItem from '../components/UserAvatar/userListItem';
import UserBadgeItem from '../components/UserAvatar/UserBadgeItem';
const GroupChatModal = ({ children ,setFetchAgain}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
   const [groupChatName,setGroupChatName]=useState();
   const [selectedUsers,setSelectedUsers]=useState([]);
   const [search,setSearch]=useState("");
   const [searchResult,setSearchResult]=useState([]);
   const [loading,setLoading]=useState(false);
   const toast=useToast();
   const {user,chats,setChats}=ChatState();
   

   const handlesearch=async (query)=>{
      setSearch(query);
      if(!query){
        return ;
      }
      try{
        setLoading(true);
        const config={
            headers:{
                Authorization: `Bearer ${user.token}`,
            },
        }
        const {data}=await axios.get(`http://localhost:5000/api/user?search=${search}`,config);
        console.log(data);
        setLoading(false);
        setSearchResult(data);
      }catch(e){
         toast({
        title: "Error occured",
        description:"Failed to load",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      }
   };


 const handleSubmit = async () => {
  if (!groupChatName || selectedUsers.length === 0) {
    toast({
      title: "Enter all the fields",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top-left",
    });
    return;
  }

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/chat/group",
      {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      },
      config
    );
    setChats([data,...chats]); 
    setFetchAgain(prev => !prev);
    onClose();

    toast({
      title: "Group Created",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-left",
    });
  } catch (error) {
    toast({
      title: "Failed to create group",
      description: error.response?.data?.message || error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-left",
    });
  }
};


const handleDelete=(deleteUser)=>{
      setSelectedUsers(selectedUsers.filter((sel)=>sel._id!==deleteUser._id));
   };


   const handleGroup=(userToAdd)=>{
      if(selectedUsers.includes(userToAdd)){
         toast({
        title: "User already added",
        description:"Failed to load",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
return;
      }
      setSelectedUsers([... selectedUsers,userToAdd])
   };

  return (
    <>
      <Text onClick={onOpen} cursor="pointer" display="inline">
        {children || "Open Modal"}
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} fontSize={"35px"} justifyContent={"center"} fontFamily={"sans-serif"}
          >Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody  display={"flex"} flexDir={"column"}  justifyContent={"center"}>
           <FormControl >
            <Input placeholder='Chat Name'mb={3} onChange={(e)=>setGroupChatName(e.target.value)}/>
           </FormControl>
             <FormControl >
            <Input placeholder='Add users'mb={1} onChange={(e)=>handlesearch(e.target.value)}/>
           </FormControl>
           <Box display={"flex"} width={"100%"} flexWrap={"wrap"}>
             {selectedUsers.map(u=>(
          <UserBadgeItem key={u._id} user={u} handleFunction={() => handleDelete(u)} />

          
          
           ))}
            </Box>
           {loading?<div>loading</div>:(
                searchResult?.slice(0,4).map(user=>(
                    <UserListItem key={user._id} user={user}handleFunction={()=>handleGroup(user)} />
     
                ))
           )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmit}>
              Create Group
            </Button>
    
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal
