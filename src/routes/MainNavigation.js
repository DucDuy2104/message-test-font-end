import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import MessageDetailScreen from '../screen/message_detail/MessageDetailScreen'
import LoginScreen from '../screen/login_screen/LoginScreen'
import MessageScreen from '../screen/message_screen/MessageScreen'

const Stack = createNativeStackNavigator()

const MainNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='login' screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='login' component={LoginScreen}/>
            <Stack.Screen name='message' component={MessageScreen}/>
            <Stack.Screen name="message-detail" component={MessageDetailScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation