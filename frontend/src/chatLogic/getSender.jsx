import React from 'react'

export const getSender = (logUser,users) => {
  return users[0]._id===logUser._id?users[1].name:users[0].name
};

export const getSenderFull = (loggedUser, users) => {
  return users.find((u) => u._id !== loggedUser._id);
};