import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useProfileStore } from '@/store/store'
import HeaderBar from '@/components/HeaderBar'
import ImageBackgroundInfo from '@/components/ImageBackgroundInfo'
import { router } from 'expo-router'
import EmptyListAnimation from '@/components/EmptyListAnimation'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '@/theme/theme'

const Favourite = () => {
  const favouriteList = useProfileStore(state => state.FavouritesList);
  if (favouriteList.length == 0) {
    return (
      <SafeAreaView className='flex-1 bg-gray-950 p-3'>
        <HeaderBar title='Favourites' />
        <EmptyListAnimation title='No Favourites' />
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView className='flex-1 bg-gray-950 p-3'>
      <ScrollView>
        <HeaderBar title='Favourites' />
        <View className='mt-5 space-y-5'>
          {
            favouriteList.map((item) => {
              return (
                <View
                  className='rounded-xl overflow-hidden'
                  key={item.id}
                >
                  <TouchableOpacity

                    onPress={() => {
                      router.push({
                        pathname: '/details/[id]',
                        params: {
                          id: item.id,
                          type: item.type,
                        }
                      })
                    }}
                  >
                    <ImageBackgroundInfo
                      details={item}
                      enableBackHandler={false}
                    />
                  </TouchableOpacity>
                  <LinearGradient
                    key={item.id}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryDarkGreyHex]}
                    className='p-3 pb-5 rounded-b-xl'
                  >
                    <Text className='text-gray-400 font-psemibold mb-2'>
                      Description
                    </Text>
                    <Text className='text-white font-pregular text-xs'>
                      {item.description}
                    </Text>
                  </LinearGradient>
                </View>

              )
            })
          }
        </View>
        <View className='py-10' />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Favourite