import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import coffeeCupLottie from '@/lottie/coffeecup.json';
const EmptyListAnimation = ({ title }
    : {
        title: string,
    }) => {
    return (
        <View className='items-center h-full bg-gray-950'>
            <LottieView
                style={{
                    height: 300,
                    width: 300,
                    marginTop: 20,
                }}
                source={coffeeCupLottie}
                autoPlay
            />
            <Text className='text-gray-400 font-pregular'>{title}</Text>
        </View>
    )
}

export default EmptyListAnimation