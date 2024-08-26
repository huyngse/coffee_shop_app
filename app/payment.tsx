import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PaymentFooter from '@/components/PaymentFooter'
import GrandientButton from '@/components/GrandientButton'
import { COLORS } from '@/theme/theme'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { router, useLocalSearchParams } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const paymentOptions = [
    {
        name: "Wallet",
        icon: "icon",
        isIcon: true
    },
    {
        name: "Google Pay",
        icon: require("../assets/app_images/gpay.png"),
        isIcon: false
    },
    {
        name: "Apple Pay",
        icon: require("../assets/app_images/applepay.png"),
        isIcon: false
    },
    {
        name: "Amazon Pay",
        icon: require("../assets/app_images/amazonpay.png"),
        isIcon: false
    },
]
const Payment = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Credit Card");
    const { amount } = useLocalSearchParams<{ amount: string }>();
    return (
        <SafeAreaView className='flex-1 bg-gray-950 p-3'>
            <ScrollView contentContainerStyle={{ justifyContent: "space-between", flex: 1 }}>
                <View>
                    <View className='flex-row items-center justify-between'>
                        <GrandientButton
                            colors={[COLORS.primaryLightGreyHex, 'transparent']}
                            onPress={() => {
                                router.back();
                            }}
                        >
                            <FontAwesome name="arrow-left" size={18} color="lightgrey" />
                        </GrandientButton>
                        <Text className='font-psemibold text-white text-lg'>Payment</Text>
                        <View className='w-4' />
                    </View >
                    <View className='space-y-3 mt-5'>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedPaymentMethod("Credit Card");
                            }}
                            className={`rounded-3xl p-3 border-2 ${selectedPaymentMethod === "Credit Card" ? "border-orange-500" : "border-gray-800"}`}
                        >
                            <Text className='text-white font-psemibold mb-2'>
                                Credit Card
                            </Text>
                            <LinearGradient
                                colors={[COLORS.primaryGreyHex, COLORS.primaryDarkGreyHex]}
                                className="py-2 px-3 rounded-3xl"
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <View className='flex-row justify-between'>
                                    <MaterialCommunityIcons
                                        name="integrated-circuit-chip"
                                        size={36}
                                        color="orange"
                                    />
                                    <FontAwesome
                                        name="cc-visa"
                                        size={36}
                                        color="aquamarine"
                                    />
                                </View>
                                <Text
                                    className='text-white my-8 font-pregular text-lg'
                                    style={{ letterSpacing: 3.85}}
                                >
                                    3897 8923 6745 4638
                                </Text>
                                <View className='flex-row justify-between'>
                                    <Text className='text-gray-400 text-xs'>
                                        Card Holder Name
                                    </Text>
                                    <Text className='text-gray-400 text-xs'>
                                        Expiry Date
                                    </Text>
                                </View>
                                <View className='flex-row justify-between'>
                                    <Text className='text-white font-pmedium text-lg'>
                                        Robert Evans
                                    </Text>
                                    <Text className='text-white font-pmedium text-lg'>
                                        02/30
                                    </Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        {
                            paymentOptions.map((option) => {
                                return (
                                    <TouchableOpacity
                                        key={option.name}
                                        onPress={() => {
                                            setSelectedPaymentMethod(option.name);
                                        }}
                                    >
                                        <LinearGradient
                                            colors={[COLORS.primaryGreyHex, COLORS.primaryDarkGreyHex]}
                                            className={`py-3 px-4 rounded-3xl flex-row items-center border-2 space-x-3 ${selectedPaymentMethod === option.name ? "border-orange-500" : "border-gray-800"}`}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                        >
                                            {
                                                option.isIcon ? (
                                                    <FontAwesome5 name="wallet" size={28} color="orange" />

                                                ) : (
                                                    <Image source={option.icon} className='w-7 h-7' />
                                                )
                                            }
                                            <Text className='text-white font-psemibold flex-1'>
                                                {option.name}
                                            </Text>
                                            {
                                                option.name === "Wallet" && (
                                                    <Text className='text-white font-pmedium'>
                                                        $100.50
                                                    </Text>
                                                )
                                            }
                                        </LinearGradient>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
                <View className='mb-2' >
                    <PaymentFooter
                        price={parseFloat(amount)}
                        currency='$'
                        buttonText={`Pay with ${selectedPaymentMethod}`}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Payment