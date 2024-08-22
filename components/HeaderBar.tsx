import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ProfileImage from './ProfileImage'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/theme/theme';
import GrandientButton from './GrandientButton';
const HeaderBar = ({ title }
    : {
        title?: string
    }) => {
    return (
        <View className='flex-row items-center justify-between'>
            <GrandientButton colors={[COLORS.primaryLightGreyHex, 'transparent']}>
                <FontAwesome name="th-large"
                    size={18}
                    color="gray"
                />
            </GrandientButton>
            <Text className='font-psemibold text-white text-lg'>{title}</Text>
            <ProfileImage />
        </View >
    )
}

export default HeaderBar