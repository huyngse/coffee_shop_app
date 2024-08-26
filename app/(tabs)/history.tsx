import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const History = () => {
  return (
    <SafeAreaView className='flex-1 bg-gray-950 p-3'>
      <ScrollView>
        <View className='py-10' />
      </ScrollView>
    </SafeAreaView>
  )
}

export default History