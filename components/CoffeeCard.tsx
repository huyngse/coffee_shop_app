import { View, Text, Dimensions, ImageBackground, ImageSourcePropType, Image, ImageProps, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/theme/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const CARD_WIDTH = Dimensions.get('screen').width * 0.32;
const CoffeeCard = ({ id, name, index, roasted, image, type, specialIngredient, averageRating, prices, onPressButton }
    : {
        id: string,
        index: number,
        name: string,
        roasted: string,
        image: ImageProps,
        type: string,
        specialIngredient: string,
        averageRating: number,
        prices: any,
        onPressButton: () => void,
    }) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            className='mx-2 p-3 rounded-lg'
        >
            <TouchableOpacity>
                <ImageBackground
                    source={image}
                    className={`rounded-xl overflow-hidden`}
                    style={{
                        width: CARD_WIDTH,
                        height: CARD_WIDTH,
                    }}
                    resizeMode='cover'
                >
                    <View className='w-full flex-row justify-end'>
                        <View className='flex-row justify-center items-center pr-2 pl-3 py-1 bg-gray-900/70 rounded-bl-2xl'>
                            <FontAwesome
                                name="star"
                                size={10}
                                color={"rgb(249 115 22)"}
                            />
                            <Text className='ml-1 text-white font-pmedium text-xs'>{averageRating}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <View
                style={{
                    width: CARD_WIDTH,
                }}
            >
                <Text className='text-white font-pmedium mt-2'>{name}</Text>
                <Text className='text-white font-plight text-[10px]'>{specialIngredient}</Text>
                <View className='flex-row justify-between mt-2 items-center'>
                    <Text className='text-white font-psemibold text-lg'>
                        <Text className='text-red-400'>{prices[0].currency}</Text> {prices[prices.length - 1].price}
                    </Text>
                    <View className='block'>
                        <TouchableOpacity
                            className='items-center justify-center bg-orange-500 p-2 rounded-md aspect-square'
                            onPress={onPressButton}
                        >
                            <FontAwesome name="plus" size={15} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default CoffeeCard