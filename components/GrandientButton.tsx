import { View, Text, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const GrandientButton = ({ children, colors }
    : {
        colors: string[],
        children: ReactNode,
    }) => {
    return (
        <TouchableOpacity className='rounded-lg border border-gray-700 overflow-hidden'>
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className='p-2'
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>

    )
}

export default GrandientButton