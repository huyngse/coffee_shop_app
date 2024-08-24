import { View, Text } from 'react-native'
import React from 'react'
import { useCartStore } from '@/store/store'
import { SafeAreaView } from 'react-native-safe-area-context';

const Cart = () => {
  const cartList = useCartStore(state => state.CartList);
  return (
    <SafeAreaView>
      <Text>{JSON.stringify(cartList)}</Text>
    </SafeAreaView>
  )
}

export default Cart