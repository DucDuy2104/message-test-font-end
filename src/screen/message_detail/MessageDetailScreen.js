import { View, Text, TextInput, Touchable, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MessageDetailStyle from './MessageDetailStyle'
import { AppContext } from '../../global/AppContext'
import MessageStyle from '../message_screen/MessageStyle'
import LoginStyle from '../login_screen/LoginStyle'
import TextMessage from '../../components/text/TextMessage'
import AxiosInstance from '../../helper/AxiosInstance'
import { io } from 'socket.io-client'
import constants from '../../constant/constants'

const MessageDetailScreen = ({ route }) => {
  const { messageId, name } = route.params
  const { user } = useContext(AppContext)
  const [messageDetails, setMessageDetails] = useState([])
  const [message, setMessage] = useState("")
  const getMessageDetails = async () => {
    const response = await AxiosInstance().get(`/message-details/get-all/${messageId}`)
    console.log("response: ", response)
    if(response.status) {
      setMessageDetails(response.data)
    }
  }

  const sendMessage = async () => {
    if(message !="" && message != null) {
      const response = await AxiosInstance().post('/message-details/create-message-detail',{
        messageId: messageId,
        text: message,
        isCustomerSent: user.role == 'customer'
      })
  
      if(response.status) {
        setMessage("")
      }
    }
  }

  useEffect(() => {
    getMessageDetails()
  }, [user, messageId])

  useEffect(() => {

    let socket = io(`http://${constants.ipV4}:3000`)

    socket.on("sendMessage", data => {
      console.log("data: ", data)
      setMessageDetails(message => {
        const newMessage = [...message]
        newMessage.push(data.messageDetail)
        return newMessage
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [user])

  return (
    <View style={MessageDetailStyle.contianer}>
      <Text style={MessageStyle.role}>{user.role == 'customer' ? "shop" : name}</Text>
      <FlatList
        data={messageDetails}
        renderItem={({ item }) => <TextMessage user={user} messageDetail={item} />}
        keyExtractor={(item, key) => key.toString()}
      />
      <View>
        <TextInput value={message} onChangeText={txt => setMessage(txt)} placeholder='message' style={MessageDetailStyle.input} />
        <TouchableOpacity onPress={sendMessage} style={LoginStyle.button}>
          <Text style={{ color: 'white' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MessageDetailScreen