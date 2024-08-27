import { View, Text, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderBar from '@/components/HeaderBar'
import { useOrderStore } from '@/store/store'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '@/theme/theme'
import { OrderItem } from '@/types'
import EmptyListAnimation from '@/components/EmptyListAnimation'
import PopUpAnimation from '@/components/PopUpAnimation'
import { router } from 'expo-router'

function formatDateString(date: Date) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const suffix = ['th', 'st', 'nd', 'rd'];

  const day = date.getDate();
  const dayWithSuffix = day + (suffix[day % 100 > 3 && day % 100 < 21 ? 0 : (day % 10 < 4 ? day % 10 : 0)]);
  const month = months[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${dayWithSuffix} ${month} ${hours}:${minutes}`;
}

const History = () => {
  const orderHistory = useOrderStore(state => state.OrderHistory);
  const [showAnimation, setShowAnimation] = useState(false);
  const handleDownload = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false)
    }, 2000);
  }
  if (orderHistory.length == 0) {
    return (
      <SafeAreaView className='flex-1 bg-gray-950 p-3'>
        <HeaderBar title='Order History' />
        <EmptyListAnimation title='No Order History' />
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView className='flex-1 bg-gray-950 p-3'>
      {
        showAnimation && (
          <PopUpAnimation source={require('../../lottie/download.json')} />
        )
      }
      <ScrollView contentContainerStyle={{ justifyContent: "space-between", minHeight: "100%" }}>
        <View>
          <HeaderBar title='Order History' />
          <View className='space-y-4 mt-5'>
            {
              orderHistory.map((order) => {
                return (
                  <View key={order.orderDate}>
                    <View className='flex-row justify-between'>
                      <Text className='text-white font-psemibold'>
                        Order Date
                      </Text>
                      <Text className='text-white font-psemibold'>
                        Total Amount
                      </Text>
                    </View>
                    <View className='flex-row justify-between'>
                      <Text className='text-white font-pregular'>
                        {formatDateString(new Date(order.orderDate))}
                      </Text>
                      <Text className='text-orange-500 font-pregular'>
                        ${order.totalPrice.toFixed(2)}
                      </Text>
                    </View>
                    <View className='mt-3'>
                      {
                        order.items.map((orderItem) => {
                          return (
                            <OrderItemCard orderItem={orderItem} key={orderItem.name} />
                          )
                        })
                      }
                    </View>
                  </View>
                )
              })
            }
          </View>
        </View>
        <View>
          <View className='rounded-xl overflow-hidden'>
            <Pressable android_ripple={{ color: "white" }} className='bg-orange-500' onPress={handleDownload}>
              <Text className='text-white text-center text-lg font-psemibold py-4'>
                Download
              </Text>
            </Pressable>
          </View>
          <View className='py-10' />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const OrderItemCard = ({ orderItem }: {
  orderItem: OrderItem
}) => {
  return (
    <LinearGradient
      colors={[COLORS.primaryGreyHex, COLORS.primaryDarkGreyHex]}
      className="py-4 rounded-3xl mb-3"
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Pressable
        className='flex-row space-x-3 items-center px-5 py-1'
        android_ripple={{ color: "lightgray" }}
        onPress={() => {
          router.push({
            pathname: "/details/[id]",
            params: {
              "id": orderItem.id,
              "type": orderItem.type,
            }
          })
        }}
      >
        <Image source={orderItem.imagelink_square} className='w-16 h-16 rounded-xl' />
        <View className='flex-1'>
          <Text className='text-white font-pmedium text-lg'>{orderItem.name}</Text>
          <Text className='text-gray-400 font-pregular text-xs'>{orderItem.special_ingredient}</Text>
        </View>
        <Text className='text-lg font-psemibold text-white'>
          <Text className='text-orange-500'>$</Text>{orderItem.totalPrice}
        </Text>
      </Pressable>
      <View className='space-y-2 mt-3 px-5'>
        {
          orderItem.prices.map((price) => {
            return (
              <View key={price.size} className='flex-row justify-between'>
                <View className='flex-row bg-zinc-900 rounded-lg items-center'>
                  <Text className={`text-center text-white font-psemibold py-3 w-20 border-r border-zinc-700 ${orderItem.type === "Bean" && "text-xs"}`}>
                    {price.size}
                  </Text>
                  <Text className='text-center text-white font-psemibold py-3 w-20'>
                    <Text className='text-orange-500'>
                      $
                    </Text>
                    {price.price}
                  </Text>
                </View>
                <Text className='text-center text-white font-psemibold py-3 w-20'>
                  <Text className='text-orange-500'>
                    X
                  </Text>
                  {price.quantity}
                </Text>
                <Text className='text-center text-orange-500 font-psemibold py-3 w-20'>
                  {price.quantity * price.price}
                </Text>
              </View>
            )
          })
        }
      </View>
    </LinearGradient>
  )
}

export default History