import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { ProductState, useProductStore } from '@/store/store';
import { CoffeeType } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageBackgroundInfo from '@/components/ImageBackgroundInfo';

const Details = () => {
  const params = useLocalSearchParams<{ index: string, id: string, type: string }>();
  const coffeeList = useProductStore((state: ProductState) => state.CoffeeList);
  const beanList = useProductStore((state: ProductState) => state.BeanList);
  const [details, setDetails] = useState<CoffeeType>();
  useEffect(() => {
    if (params.type === "Coffee") {
      setDetails(coffeeList.find((item: CoffeeType) => item.id === params.id));
    } else if (params.type === "Bean") {
      setDetails(beanList.find((item: CoffeeType) => item.id === params.id));
    }
  }, [params])
  if (details == undefined) {
    return (
      <View className='justify-center items-center h-full bg-gray-950'>
        <Text className='text-white'>Product not found</Text>
      </View>
    )
  }
  const backHandler = () => {
    router.back();
  }
  return (
    <SafeAreaView className='bg-primaryBlack'>
      <View className='h-full p-3'>
        <ScrollView className='h-full'>
          <ImageBackgroundInfo
            details={details}
            enableBackHandler={true}
            backHandler={backHandler}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Details