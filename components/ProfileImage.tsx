import { View, Text, Image } from 'react-native'
import React from 'react'

const ProfileImage = () => {
    return (
        <View className='h-10 w-10 rounded-xl border-2 items-center justify-center overflow-hidden'>
            <Image
                source={require('@/assets/app_images/avatar.png')}
                className='w-full h-full object-cover'
            />
        </View>
    )
}

export default ProfileImage