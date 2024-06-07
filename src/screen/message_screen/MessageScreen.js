import { View, Text, FlatList, Touchable, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MessageStyle from './MessageStyle'
import Message from '../../components/message/Message'
import { AppContext } from '../../global/AppContext'
import LoginStyle from '../login_screen/LoginStyle'
import AxiosInstance from '../../helper/AxiosInstance'
import { io } from 'socket.io-client'
import constants from '../../constant/constants'

const MessageScreen = ({ navigation }) => {
  const { user } = useContext(AppContext)
  const [messages, setMessages] = useState([])

  let socket;


  useEffect(() => {
    socket = io(`http://${constants.ipV4}:3000`)

    socket.on("connect", (socket) => {
      console.log("connection")
    })

    socket.on("createMessage", data => {
      if(data.message.userId == user._id) {
        setMessages([data.message])
      }
      if(user.role != 'customer') {
        setMessages(messages => {
          const newMessages = [...messages]
          newMessages.push(data.message)
          return newMessages
        })
      }
    })

    return () => {
      socket.disconnect();
    };
  }, [user])

  

  const getMessage = async () => {
    const response = await AxiosInstance().get(`/messages/get-message/${user._id}`)
    console.log("response: ", response)
    if (response.status && response.data != null) {
      setMessages(messages => {
        const newMessages = [...messages]
        newMessages.push(response.data)
        return newMessages
      })
    }
  }

  const getAllMessage = async () => {
    const response = await AxiosInstance().get('/messages/get-all-messages')
    console.log("response: ", response)
    if (response.status && response.data != null) {
      setMessages(response.data)
    }
  }
  useEffect(() => {
    if (user.role == 'customer') {
      getMessage()
    } else {
      getAllMessage()
    }
  }, [user])

  const onMoveToMessageDetail = (messageId, name) => {
    navigation.navigate("message-detail", {
      messageId,
      name
    })
  }

  return (
    <View style={MessageStyle.container}>
      <Text style={MessageStyle.role}>{user.role.toUpperCase()}</Text>
      {
        messages.length > 0 ? (
          <FlatList
            data={messages}
            renderItem={({ item }) => <Message onMoveToDetailMessage={onMoveToMessageDetail} isAdmin={user.role == "admin"} message={item} />}
            keyExtractor={(item, id) => id.toString()}
          />
        ) : (
          <TouchableOpacity style={LoginStyle.button}>
            <Text style={{ color: "white" }}>Chat with shop</Text>
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default MessageScreen