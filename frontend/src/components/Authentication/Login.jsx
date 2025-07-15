import {Input, InputRightElement,Button,FormControl,FormLabel, VStack, InputGroup ,useToast} from '@chakra-ui/react'
import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Login = () => {
       const [email,setEmail]=useState();
       const [password,setPassword]=useState();
       const [show,setShow]=useState(false);
       const [loading,setLoading]=useState(false);
       const toast=useToast();

       const navigate=useNavigate();
       
       
       function handleClick(){
         setShow(!show);
       }
      
       const submitHandler=async ()=>{
       setLoading(true);
       if(!email||!password){
       toast({
      title:"Please fill all the fields",
      status:"warning",
      duration:5000,
      isClosable:true,
      position:"bottom",
    });
    setLoading(false);
    return;
  }


  try{
        const config={
          headers:{
              "Content-type":"application/json",

          },
        };
      const {data}=await axios.post("http://localhost:5000/api/user/login",
           { email,password},
           config
          );
          toast({
      title: "Login Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });

    localStorage.setItem("userInfo",JSON.stringify(data));
    
    setLoading(false);
     navigate("/chats");
   
      }catch (error) {
         console.error("Login error:", error.response || error);
      toast({
        title: "Login failed",
        description:error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }


};
   
     return (
       <VStack spacing="5px" color="black">
   
     <FormControl>
       <FormLabel>Email</FormLabel>
       <Input 
         placeholder="Enter your Email"
         onChange={(e) => setEmail(e.target.value)}
       />
     </FormControl>
   
     <FormControl>
       <FormLabel>Password</FormLabel>
       <InputGroup>
        <Input 
         type={show?"text":"password"}
         placeholder="Enter your password"
         onChange={(e) => setPassword(e.target.value)}
       />
       <InputRightElement width="4.5rem">
       <Button h="1.75 rem" size="sm"onClick={handleClick}isLoading={loading}>
         {show?"hide":"show"}
       </Button>
       </InputRightElement>
       </InputGroup>
     </FormControl>
     <Button colorScheme='blue' width="100%" onClick={submitHandler}style={{marginTop:15}}>
        LOGIN
     </Button>
     <Button
     variant="solid"
     colorScheme='red'
     width="100%"
     onClick={()=>{
      setEmail("guest@example.com");
      setPassword("123456")
     }}>Guest User</Button>
   </VStack>
   
     )
}

export default Login
