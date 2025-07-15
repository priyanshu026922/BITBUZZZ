import React from 'react'
import {IconButton} from "@chakra-ui/button"
import { useDisclosure} from "@chakra-ui/hooks"
import {ViewIcon}from "@chakra-ui/icons"
import { Image, Text } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
const Profile = ({user,children}) => {
   const {isOpen,onOpen,onClose}=useDisclosure();
   return (
    <div>
      {children?(<span onClick={onOpen}>{children}</span>):(
        <IconButton
        display={{base:"flex"}}
          icon ={<ViewIcon/>}
        onClick={onOpen}
        />
      )}
       <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
           display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between">
          <ModalHeader
              fontSize="40px"
              fontFamily={"sans-serif"}
              display="flex"
              justifyContent={"center"}
          
          >{user.name}</ModalHeader>
          <ModalCloseButton />
           <ModalBody display="flex" flexDirection="column" alignItems="center" gap={4}>
               <Image

                  borderRadius={"full"}
                  boxSize={"150px"}
                  src={user.pic}
                  alt={user.name}
               
               />
               <Text fontSize={{base:"28px",md:"30px"}} fontFamily={"sans-serif"}>
                Email :{user.email}
               </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Profile
