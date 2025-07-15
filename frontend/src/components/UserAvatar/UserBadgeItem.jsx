import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({user,handleFunction}) => {
  return (
  <Box
    px={2}
    py={1}
    display="flex"
      alignItems="center"
    borderRadius="lg" m={1} mb={2} fontSize={12} bg="purple.200" color="black" cursor="pointer"   _hover={{ bg: "purple.300" }}onClick={handleFunction}>
        {user.name}
        <CloseIcon pl={1}  boxSize={2.5} ml={1}/>
</Box>
  )
}

export default UserBadgeItem
