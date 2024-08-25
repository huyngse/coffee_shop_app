import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { convertCartItemToOrderItem, useCartStore } from '@/store/store'
import { SafeAreaView } from 'react-native-safe-area-context';
import { OrderItem } from '@/types';
import HeaderBar from '@/components/HeaderBar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/theme/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import PaymentFooter from '@/components/PaymentFooter';
import { router } from 'expo-router';
import EmptyListAnimation from '@/components/EmptyListAnimation';

const Cart = () => {
  const cartList = useCartStore(state => state.CartList);
  const updateItemQuantity = useCartStore(state => state.updateItemQuantity);
  const removeItem = useCartStore(state => state.removeItem);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  var totalPrice = 0;
  useEffect(() => {
    setOrderItems(convertCartItemToOrderItem(cartList));
  }, [cartList]);
  if (orderItems.length == 0) {
    return (
      <SafeAreaView className='flex-1 bg-gray-950 p-3'>
        <HeaderBar title='Cart' />
        <EmptyListAnimation title='Cart is Empty'/>
      </SafeAreaView>
    )
  } else {
    totalPrice = orderItems.reduce((accumulator: number, currentValue: OrderItem) =>
      accumulator += currentValue.totalPrice
      , 0);
  }
  function handleIncreaseQuantity(coffeeId: string, coffeeSize: string, currentQuantity: number) {
    updateItemQuantity(coffeeId, coffeeSize, currentQuantity + 1);
  }
  function handleDecreseQuantity(coffeeId: string, coffeeSize: string, currentQuantity: number) {
    if (currentQuantity == 1) {
      removeItem(coffeeId, coffeeSize);
    } else {
      updateItemQuantity(coffeeId, coffeeSize, currentQuantity - 1);
    }
  }
  return (
    <SafeAreaView className='flex-1 bg-gray-950 p-3'>
      <ScrollView contentContainerStyle={{ justifyContent: "space-between", minHeight: "100%" }}>
        <View>
          <HeaderBar title='Cart' />
          <View className='mt-5 space-y-4'>
            {
              orderItems.map(item => (
                <LinearGradient
                  key={item.id}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryDarkGreyHex]}
                  className='p-3 rounded-xl'
                >
                  <View className='flex-row gap-5'>
                    <TouchableOpacity
                      className={`${item.prices.length == 1 ? "w-2/5" : "w-1/3"} aspect-square rounded-xl overflow-hidden`}
                      onPress={() => {
                        router.push({
                          pathname: "/details/[id]",
                          params: {
                            id: item.id,
                            type: item.type
                          }
                        })
                      }}
                    >
                      <Image
                        source={item.imagelink_square}
                        className={'w-full h-full object-cover'}
                      />
                    </TouchableOpacity>
                    <View className='flex-1'>
                      <Text className='text-white text-lg font-pmedium'>{item.name}</Text>
                      <Text className='text-gray-400 font-pmedium text-xs'>{item.special_ingredient}</Text>
                      {
                        item.prices.length == 1 ? (
                          <>
                            <View className='flex-row justify-between mt-1 items-center space-x-5'>
                              <Text className='text-white font-pmedium bg-gray-900 px-3 py-2 rounded-lg flex-1 text-center'>
                                {item.prices[0].size}
                              </Text>
                              <Text className='text-white font-psemibold text-xl flex-1'>
                                <Text className='text-orange-500'>$</Text>
                                {item.prices[0].price}
                              </Text>
                            </View>
                            <View className='flex-row justify-between mt-2 items-center space-x-5'>
                              <TouchableOpacity
                                className='bg-orange-500 p-2 rounded-lg'
                                onPress={() => { handleDecreseQuantity(item.id, item.prices[0].size, item.prices[0].quantity) }}
                              >
                                <FontAwesome name="minus" size={12} color="white" />
                              </TouchableOpacity>
                              <View className='border border-orange-500 rounded-lg w-14 h-8 justify-center items-center'>
                                <Text className='text-white font-psemibold'>
                                  {item.prices[0].quantity}
                                </Text>
                              </View>
                              <TouchableOpacity
                                className='bg-orange-500 p-2 rounded-lg'
                                onPress={() => { handleIncreaseQuantity(item.id, item.prices[0].size, item.prices[0].quantity) }}
                              >
                                <FontAwesome name="plus" size={12} color="white" />
                              </TouchableOpacity>
                            </View>
                          </>
                        ) : (
                          <View className='flex-1 flex-row items-center'>
                            <Text className='text-gray-400 font-pmedium bg-gray-900 p-3 rounded-lg'>
                              {item.roasted}
                            </Text>
                          </View>
                        )
                      }
                    </View>
                  </View>
                  <View className='space-y-3 mt-3'>
                    {
                      item.prices.length > 1 && item.prices.map((price) => (
                        <View className='flex-row justify-between items-center' key={price.size}>
                          <Text className='text-white font-pmedium bg-gray-900 px-3 py-2 rounded-lg w-20 text-center'>
                            {price.size}
                          </Text>
                          <Text className='text-white font-psemibold text-lg w-14 overflow-clip'>
                            <Text className='text-orange-500 '>$</Text>
                            {price.price}
                          </Text>
                          <TouchableOpacity
                            className='bg-orange-500 p-2 rounded-lg'
                            onPress={() => { handleDecreseQuantity(item.id, price.size, price.quantity) }}
                          >
                            <FontAwesome name="minus" size={12} color="white" />
                          </TouchableOpacity>
                          <View className='border border-orange-500 rounded-lg w-14 h-8 justify-center items-center'>
                            <Text className='text-white font-psemibold'>
                              {price.quantity}
                            </Text>
                          </View>
                          <TouchableOpacity
                            className='bg-orange-500 p-2 rounded-lg'
                            onPress={() => { handleIncreaseQuantity(item.id, price.size, price.quantity) }}
                          >
                            <FontAwesome name="plus" size={12} color="white"
                            />
                          </TouchableOpacity>
                        </View>
                      ))
                    }
                  </View>
                </LinearGradient>
              ))
            }
          </View>
        </View>

        <View>
          <PaymentFooter price={totalPrice} currency='$' buttonText='Pay' />
          <View className='py-10' />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Cart