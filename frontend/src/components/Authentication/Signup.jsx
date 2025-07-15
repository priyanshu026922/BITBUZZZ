import React, { useState } from 'react';
import {
  Input,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  VStack,
  InputGroup,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

import axios from 'axios'
const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate=useNavigate();


 
  const handleClick = () => setShow(!show);

  const submitHandler=async ()=>{
  setLoading(true);
  if(!name||!email||!password){
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
      const {data}=await axios.post("http://localhost:5000/api/user",
           { name,email,password,pic},config
          );
          toast({
      title: "Registration Succesful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });

    localStorage.setItem('userInfo',JSON.stringify(data));
     navigate("/chats");
    setLoading(false);
   
      }catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }


};

const postDetails = async (picFile) => {
  setLoading(true);

  if (!picFile) {
    toast({
      title: "Please Select an Image!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

  if (picFile.type ==="image/jpeg"||picFile.type === "image/png") {
    const data = new FormData();
    data.append("file", picFile);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "dgbq3zvgi");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dgbq3zvgi/image/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      console.log("Upload response:", result);

      if (result.url) {
        setPic(result.url.toString());
        toast({
          title: "Upload successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        throw new Error(result.error?.message || "Unknown error");
      }
    } catch (err) {
      console.error("Upload failed:", err.message);
      toast({
        title: "Upload failed",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  } else {
    toast({
      title: "Invalid Image Type",
      description: "Only JPEG or PNG allowed.",
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter your Name" onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button colorScheme="blue" width="100%" mt={4} onClick={submitHandler} isLoading={loading}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
