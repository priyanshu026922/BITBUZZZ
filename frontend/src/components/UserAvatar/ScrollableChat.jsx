import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isSameSender ,isSameSenderMargin,isSameUser,islastMessage } from '../../chatLogic/getSender'
import { ChatState } from '../../context/ChatProvider'
import { Avatar, Tooltip } from '@chakra-ui/react'
const ScrollableChat = ({messages}) => {
  const {user}=ChatState();
  return (
    <ScrollableFeed>
        {messages && messages.map((m, index) => (
  <div style={{ display: "flex" }} key={m._id}>
    {(isSameSender(messages, m, index, user._id) ||
      islastMessage(messages, index, user._id)) && (
      <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
        <Avatar
          size="sm"
          cursor="pointer"
          name={m.sender.name}
          src={m.sender.pic}
        />
      </Tooltip>
    )}

    <span
      style={{
        backgroundColor: m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0",
        borderRadius: "20px",
        padding: "5px 15px", 
        maxWidth: "75%",
        marginLeft: isSameSenderMargin(messages, m, index, user._id) ,
        marginTop:isSameUser(messages,m,index,user.id)?3:10,
      }}
    >
      {m.content}
    </span>
  </div>
))}

    </ScrollableFeed>
   
  )
}

export default ScrollableChat
