import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const CoffeeDetail = () => {
  const { coffeeId } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Text>
        {coffeeId}
      </Text>
    </SafeAreaView>
  )
}

export default CoffeeDetail