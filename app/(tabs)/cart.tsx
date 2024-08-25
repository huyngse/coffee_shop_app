import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { convertCartItemToOrderItem, useCartStore } from '@/store/store'
import { SafeAreaView } from 'react-native-safe-area-context';
import { OrderItem } from '@/types';

const Cart = () => {
  const cartList = useCartStore(state => state.CartList);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  useEffect(() => {
    setOrderItems(convertCartItemToOrderItem(cartList));
  }, [cartList]);
  if (orderItems.length == 0) {
    return (
      <View className='justify-center items-center h-full bg-gray-950'>
        <Text className='text-white'>Cart is empty</Text>
      </View>
    )
  }
  return (
    <SafeAreaView>
      <View>
        {
          orderItems.map(item => (
            <View key={item.id}>
              <View className='flex-row'>
                <View>
                  <Text>{item.name}</Text>
                  <Text>{item.special_ingredient}</Text>
                </View>
                <Text>
                  {item.totalPrice}
                </Text>
              </View>
              {
                item.prices.map((price) => (
                  <View className='flex-row' key={price.size}>
                    <Text>{price.size}</Text>
                    <Text>${price.price}</Text>
                    <Text>x{price.quantity}</Text>
                    <Text>{(price.quantity * price.price).toFixed(2)}</Text>
                  </View>
                ))
              }
            </View>
          ))
        }
      </View>
    </SafeAreaView>
  )
}

export default Cart