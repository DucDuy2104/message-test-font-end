import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MessageStyle from './MessageStyle'

const Message = ({isAdmin, message, onMoveToDetailMessage}) => {
  console.log(message)
  const lastMessage  = message.messageDetails[message.messageDetails.length - 1].text
  return (
    <TouchableOpacity onPress={() => {onMoveToDetailMessage(message._id, message.user.name)}} style={MessageStyle.container}>
      <Text style={MessageStyle.name}>{isAdmin?message.user.name :  "Shop" }</Text>
      <Text style={MessageStyle.message}>{lastMessage ? lastMessage : "no message"}</Text>
    </TouchableOpacity>
  )
}

export default Message