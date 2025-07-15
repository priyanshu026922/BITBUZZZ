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
  Input,Box,
  IconButton,
  Spinner
} from '@chakra-ui/react'
import { ChatState } from '../context/ChatProvider'
import UserBadgeItem from '../components/UserAvatar/UserBadgeItem'
import { ViewIcon } from '@chakra-ui/icons'
import axios from 'axios'
import UserListItem from '../components/UserAvatar/userListItem'
const UpdategroupChat = ({fetchAgain,setFetchAgain}) => {
    
      const { isOpen, onOpen, onClose } = useDisclosure();
      const {selectedChat,setSelectedChat,user}=ChatState();
      const [groupChatName,setGroupChatName]=useState();
         const [search,setSearch]=useState("");
         const [searchResult,setSearchResult]=useState([]);
         const [loading,setLoading]=useState(false);
         const [renameLoading,setRenameLoading]=useState(false);
         const toast=useToast();

         const handleremove=async(User)=>{
           if(selectedChat.groupAdmin._id!==user._id&&User._id!==user._id){
              toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
        return;
         }
            

        try{
           setLoading(true);
       const config={
                headers:{
                    Authorization:`Bearer ${user.token}`,
                }
            };
            const {data}=await axios.put(`http://localhost:5000/api/chat/groupRemove`,{
                chatId:selectedChat._id,
                userId:User._id,
            },
           config
        );

        User._id===user._id?setSelectedChat(""):setSelectedChat(data);
        setFetchAgain(prev=>!prev);
          setLoading(false);
       }catch(e){
           toast({
        title:e.response?.data?.message || e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
          });
       setLoading(false);
       }
      


        }

         const handleAddUser=async(User)=>{
       if(selectedChat.users.find((u)=>u._id===User._id)){
         toast({
        title: "User already in the group",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
          });
        return;
       }

       if(selectedChat.groupAdmin._id!==user._id){
         toast({
        title: "Only admins are allowed ",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
          });
     return;
       }

       try{
        setLoading(true);
       const config={
                headers:{
                    Authorization:`Bearer ${user.token}`,
                },
            };
            const {data}=await axios.put(`http://localhost:5000/api/chat/group-add`,
                {
                chatId:selectedChat._id,
                userId:User._id,
                },
           config
        );
          setSelectedChat(data);
          setFetchAgain(prev=>!prev);
          setLoading(false);
       }catch(e){
           toast({
        title: "Error Occurred! ",
       description: e.response?.data?.message || e.message,
        duration: 5000,
        isClosable: true,
        position: "bottom",
          });
       setLoading(false);
       }
       setGroupChatName("");

         };


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
         setLoading(false);
               }
            };




         const handleRename=async()=>{
          if(!groupChatName){
            return;
          }
          try{
            setRenameLoading(true);
            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`,
                }
            };
            const {data}=await axios.put(`http://localhost:5000/api/chat/rename`,{
                chatId:selectedChat._id,
                chatName:groupChatName,
            },
           config
        );
        setSelectedChat(data);
        setFetchAgain(prev=>!prev);
        setRenameLoading(false);

          }catch(e){
              toast({
        title: "Error occured",
        description:"Failed to load",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
          });
         }finally{
         setGroupChatName("");
      setRenameLoading(false);
         };
        }
          
  return (
    <>
      <IconButton display={{base:"flex"}} icon={<ViewIcon/>}onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{selectedChat.chatName.toUpperCase()}</ModalHeader>
         
         
          <ModalCloseButton />
          <ModalBody>
          <Box width={"100%"}display={"flex"} justifyContent={"space-around"}flexWrap={"wrap"}pb={"3"}>
            {selectedChat.users.map(u=>(
                <UserBadgeItem key={u._id} user={u} handleFunction={() => handleremove(u)} />
            ))}

          </Box>
          <FormControl display={"flex"}>
             <Input
             placeholder={"Update Chat Name"}
             mb={3}
             onChange={(e)=>{
                setGroupChatName(e.target.value)
             }}
             
             />
              <Button background={"teal"}
                 isLoading={renameLoading}
                 onClick={handleRename} pl={"3"}
              >Update</Button>


          </FormControl>
          <FormControl>
            <Input
              placeholder='Add user to group'
              mb={1}
              onChange={(e)=>handlesearch(e.target.value)}
            
            />
          </FormControl>
          {loading?(
            <Spinner size="lg"/>
          ):(
            searchResult?.map((user)=>(
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={()=>handleAddUser(user)}
                
                />
            ))
          )


          }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={()=>handleremove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdategroupChat
