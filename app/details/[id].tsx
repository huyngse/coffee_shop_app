import { View, Text, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { ProductState, useCartStore, useProductStore } from '@/store/store';
import { CoffeePriceType, CoffeeType } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageBackgroundInfo from '@/components/ImageBackgroundInfo';
import PaymentFooter from '@/components/PaymentFooter';

const Details = () => {
  const params = useLocalSearchParams<{ index: string, id: string, type: string }>();
  const coffeeList = useProductStore(state => state.CoffeeList);
  const beanList = useProductStore(state => state.BeanList);
  const addToCart = useCartStore(state => state.addToCart);
  const [details, setDetails] = useState<CoffeeType>();
  const [selectedPrice, setSelectedPrice] = useState<CoffeePriceType>();
  const [showFullDescription, setShowFullDescription] = useState(false);
  useEffect(() => {
    if (params.type === "Coffee") {
      const tmp = coffeeList.find((item: CoffeeType) => item.id === params.id);
      setDetails(tmp);
    } else if (params.type === "Bean") {
      const tmp = beanList.find((item: CoffeeType) => item.id === params.id);
      setDetails(tmp);
    }
  }, [params])
  useEffect(() => {
    if (details) {
      setSelectedPrice(details.prices[0]);
    }
  }, [details])

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
  const handleAddToCart = () => {
    if (selectedPrice) {
      const itemToAdd: CoffeeType = { ...details };
      itemToAdd.prices = [selectedPrice];
      addToCart(itemToAdd);
      router.navigate('/(tabs)/cart');
    }
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
          <View className='p-3'>
            <Text className='text-gray-400 font-psemibold my-2'>
              Description
            </Text>
            {
              showFullDescription ? (
                <TouchableWithoutFeedback onPress={() => { setShowFullDescription(false) }}>
                  <View>
                    <Text className='text-white font-pregular'>
                      {details.description}
                    </Text>
                    <Text className='text-gray-400 font-pregular text-xs'>(show less)</Text>
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback onPress={() => { setShowFullDescription(true) }}>
                  <View>
                    <Text numberOfLines={3} className='text-white font-pregular'>
                      {details.description}
                    </Text>
                    <Text className='text-gray-400 font-pregular text-xs mt-1'>(show more)</Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            }
            <Text className='text-gray-400 font-psemibold my-2'>Size</Text>
            <View className='flex-row flex-wrap justify-end'>
              {
                details?.prices.map((price) => {
                  const isSelected = selectedPrice?.size === price.size;
                  return (
                    <View className='w-1/3' key={price.size}>
                      <TouchableOpacity
                        onPress={() => setSelectedPrice(price)}
                        className={`m-2 bg-gray-900 border-2 rounded-xl py-2 ${isSelected && "outline-1 border-orange-500"}`}
                      >
                        <Text className={`text-center  ${isSelected ? "font-pmedium text-orange-500" : "text-gray-400"} ${details.type === "Coffee" && "text-lg"}`}>
                          {price.size}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                })
              }
            </View>
            {
              selectedPrice && (
                <PaymentFooter
                  price={parseFloat(selectedPrice.price)}
                  currency={selectedPrice.currency}
                  buttonText='Add to Cart'
                  onPress={handleAddToCart}
                />
              )
            }
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Details