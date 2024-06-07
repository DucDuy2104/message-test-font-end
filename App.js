import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { AppProvider } from './src/global/AppContext'
import MainNavigation from './src/routes/MainNavigation'

const App = () => {
  return (
    <AppProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <MainNavigation />
      </SafeAreaView>
    </AppProvider>
  )
}

export default App