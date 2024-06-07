import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import LoginStyle from './LoginStyle'
import { AppContext } from '../../global/AppContext'
import AxiosInstance from '../../helper/AxiosInstance'

const LoginScreen = ({navigation}) => {
  var { user, setUser } = useContext(AppContext)
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  })

  const onLogin = async () => {
    const response = await AxiosInstance().post('/users/login', userLogin)
    if(response.status) {
      setUser(response.data)
      navigation.navigate('message')
    }
  }

  return (
    <View style={LoginStyle.container}>
      <Text>Login</Text>
      <TextInput style={LoginStyle.input} placeholder='email' value={userLogin.email}  onChangeText={text => setUserLogin({
        ...userLogin,
        email: text
      })}/>
      <TextInput style={LoginStyle.input} placeholder='pass' value={userLogin.password}  onChangeText={text => setUserLogin({
        ...userLogin,
        password: text
      })}/>
      <TouchableOpacity onPress={onLogin} style={LoginStyle.button}>
        <Text>Login</Text>
      </TouchableOpacity>

    </View>
  )
}

export default LoginScreen