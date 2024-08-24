import { View, Text, ImageProps, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { CoffeeType } from '@/types'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import GrandientButton from './GrandientButton'
import { COLORS } from '@/theme/theme'
import { ProfileState, useProfileStore } from '@/store/store'

const ImageBackgroundInfo = ({
  enableBackHandler,
  backHandler,
  details
}: {
  enableBackHandler: boolean,
  backHandler?: () => void,
  details: CoffeeType,
}) => {
  const favouriteList = useProfileStore((state: ProfileState) => state.FavouritesList);
  const addToFavourite = useProfileStore((state: ProfileState) => state.addToFavourite);
  const removeFromFavourite = useProfileStore((state: ProfileState) => state.removeFromFavourite);
  const isFavourite = favouriteList.find((item: CoffeeType) => item.id === details.id) != null;
  const toggleFavourite = () => {
    if (isFavourite) {
      removeFromFavourite(details);
    } else {
      addToFavourite(details);
    }
  }
  return (
    <View>
      <ImageBackground
        source={details.imagelink_portrait}
        className='w-full aspect-[20/25] justify-between'
      >
        {enableBackHandler ? (
          <View className='flex-row justify-between p-3'>
            <GrandientButton
              colors={[COLORS.primaryLightGreyHex, COLORS.primaryDarkGreyHex]}
              onPress={backHandler}
            >
              <FontAwesome name="arrow-left" size={18} color="lightgrey" />
            </GrandientButton>
            <GrandientButton
              colors={[COLORS.primaryLightGreyHex, COLORS.primaryDarkGreyHex]}
              onPress={toggleFavourite}
            >
              <FontAwesome name="heart" size={18} color={isFavourite ? "red" : "lightgrey"} />
            </GrandientButton>
          </View>
        ) : (
          <View className='flex-row justify-end p-3'>
            <GrandientButton
              colors={[COLORS.primaryLightGreyHex, COLORS.primaryDarkGreyHex]}
              onPress={toggleFavourite}
            >
              <FontAwesome name="heart" size={18} color={isFavourite ? "red" : "lightgrey"} />
            </GrandientButton>
          </View>
        )}
        <View className='bg-black/60 px-5 pb-2 pt-3 rounded-t-3xl flex-row flex-wrap items-center'>
          <View className='w-1/2'>
            <Text className='text-white font-psemibold text-xl'>
              {details.name}
            </Text>
            <Text className='text-gray-400 font-plight'>
              {details.special_ingredient}
            </Text>
          </View>
          <View className='w-1/4'>
            <View className='m-2 p-2 bg-gray-900 rounded-lg items-center justify-center'>
              <FontAwesome name={details.type === "Coffee" ? "coffee" : "leaf"} size={24} color="orange" />
              <Text className='mt-1 text-gray-400 font-plight text-xs'>{details.type}</Text>
            </View>
          </View>
          <View className='w-1/4'>
            <View className='m-2 p-2 bg-gray-900 rounded-lg items-center justify-center'>
              <FontAwesome name="tint" size={24} color="orange" />
              <Text className='mt-1 text-gray-400 font-plight text-xs'>{details.ingredients}</Text>
            </View>
          </View>

          <View className='w-1/2 flex-row items-center space-x-2'>
            <FontAwesome name="star" size={20} color="orange" />
            <Text className='text-lg font-pmedium text-white'>
              {details.average_rating}
            </Text>
            <Text className='text-gray-400 text-xs font-plight'>
              ({details.ratings_count})
            </Text>
          </View>
          <View className='w-1/2'>
            <View className='m-2 h-12 px-2 bg-gray-900 rounded-lg items-center justify-center'>
              <Text className='text-gray-400 font-pmedium text-xs'>
                {details.roasted}
              </Text>
            </View>
          </View>

        </View>
      </ImageBackground>
    </View>
  )
}

export default ImageBackgroundInfo