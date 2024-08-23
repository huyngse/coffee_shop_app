import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS } from '@/theme/theme';
import { BlurView } from 'expo-blur';
const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: COLORS.primaryOrangeHex,
      tabBarInactiveTintColor: COLORS.primaryLightGreyHex,
      headerShown: false,
      // tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: styles.tabBarStyle,
      tabBarBackground: () => (
        <BlurView intensity={15} style={styles.blurViewStyles} />
      )
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <FontAwesome name="shopping-cart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favourite"
        options={{
          title: 'Favourite',
          tabBarIcon: ({ color }) => <FontAwesome name="heart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => <FontAwesome name="history" size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}
const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: "rgba(0,0,0,1)",
    borderTopWidth: 0,
    elevation: 0,
    height: 70,
    paddingBottom: 15,
    paddingTop: 15,
  },
  blurViewStyles: {
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
})
export default TabsLayout