import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const PaymentFooter = ({ price, currency, buttonText, onPress }: {
    price: number,
    currency: string,
    buttonText: string,
    onPress?: () => void,
}) => {
    return (
        <View className='flex-row mt-5'>
            <View className='items-center w-1/3'>
                <Text className='text-sm text-gray-400 font-pmedium'>Price</Text>
                <Text className='text-white text-lg font-pmedium'>
                    <Text className='text-red-400 font-psemibold'>{currency}</Text>{price.toFixed(2)}
                </Text>
            </View>
            <TouchableOpacity className='w-2/3 rounded-xl py-3 bg-orange-500 justify-center items-center' onPress={onPress}>
                <Text className='font-psemibold  text-white'>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default PaymentFooter