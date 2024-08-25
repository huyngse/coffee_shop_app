import { View, Text, Dimensions, ImageBackground, ImageSourcePropType, Image, ImageProps, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/theme/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CoffeeType } from '@/types';
import { router } from 'expo-router';
import { useCartStore } from '@/store/store';
const CARD_WIDTH = Dimensions.get('screen').width * 0.32;
const CoffeeCard = ({ coffeeData }
    : {
        coffeeData: CoffeeType;
    }) => {
    const { id, index, type, name, imagelink_square, special_ingredient, average_rating, prices } = coffeeData;
    const addToCart = useCartStore(state => state.addToCart);
    const handleAddToCart = () => {
        const itemToAdd: CoffeeType = { ...coffeeData };
        itemToAdd.prices = [prices[prices.length - 1]];
        addToCart(itemToAdd);
        ToastAndroid.showWithGravity(`${name} is added to cart`, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            className='mx-2 p-3 rounded-lg'
        >
            <TouchableOpacity onPress={() => {
                router.push({
                    pathname: '/details/[id]',
                    params: {
                        index: index,
                        id: id,
                        type: type
                    }
                });
            }}>
                <ImageBackground
                    source={imagelink_square}
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
                            <Text className='ml-1 text-white font-pmedium text-xs'>{average_rating}</Text>
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
                <Text className='text-white font-plight text-[10px]'>{special_ingredient}</Text>
                <View className='flex-row justify-between mt-2 items-center'>
                    <Text className='text-white text-lg font-pmedium'>
                        <Text className='text-red-400 font-psemibold'>{prices[0].currency}</Text>{prices[prices.length - 1].price}
                    </Text>
                    <View className='block'>
                        <TouchableOpacity
                            className='items-center justify-center bg-orange-500 p-2 rounded-md aspect-square'
                            onPress={handleAddToCart}
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