import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

const PopUpAnimation = ({ source }
    : {
        source: any,
    }) => {
    return (
        <View className='flex-1 absolute top-0 bottom-0 left-0 right-0 z-50 justify-center items-center bg-gray-900/50'>
            <LottieView
                source={source}
                loop={false}
                autoPlay
                style={{ width: 300, height: 300 }}
            />
        </View>
    )
}

export default PopUpAnimation