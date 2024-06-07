import { View, Text } from 'react-native'
import React from 'react'
import TextStyle from './TextStyle'

const TextMessage = ({user, messageDetail}) => {
  var isMyText = false;
  if(user.role === 'customer' && messageDetail.isCustomerSent === true) {
    isMyText = true
  }else if(user.role != 'customer' && messageDetail.isCustomerSent === false) {
    isMyText = true
  } else {
    isMyText = false
  }

  return (
    <View style={isMyText? TextStyle.myContainer : TextStyle.yourContainer}>
      <Text style={isMyText? TextStyle.myText : TextStyle.yourText}>{messageDetail.text}</Text>
    </View>
  )
}

export default TextMessage