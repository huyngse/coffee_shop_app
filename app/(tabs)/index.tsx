import { View, Text, ScrollView, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '@/store/store';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { COLORS } from '@/theme/theme';
import HeaderBar from '@/components/HeaderBar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const getCatesFromData = (data: any[]) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let cates = Object.keys(temp);
  cates.unshift('All');
  return cates;
}
const getCoffeeByCategory = (cate: string, coffeeList: any[]) => {
  if (cate == "All") return coffeeList;
  return coffeeList.filter((coffee: any) => coffee.name == cate);
}
const Home = () => {
  const coffeeList = useStore((state: any) => state.CoffeeList);
  const beanList = useStore((state: any) => state.BeanList);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [cateIndex, setCateIndex] = useState({
    index: 0,
    category: categories[0]
  });
  const [sortedCoffee, setSortedCoffee] = useState<any[]>([]);
  useEffect(() => {
    const cates = getCatesFromData(coffeeList);
    if (cates != null) {
      setCategories(cates);
    }
  }, []);
  useEffect(() => {
    setSortedCoffee(getCoffeeByCategory(cateIndex.category, coffeeList));
  }, [cateIndex])

  return (
    <SafeAreaView>
      <ExpoStatusBar style='light' backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView className='bg-primaryBlack h-full p-3'>
        <HeaderBar />
        <Text className='text-white mt-8 text-2xl font-psemibold'>
          Find the best {'\n'}coffee for you
        </Text>
        <View className='bg-gray-800 rounded-xl flex-row px-4 py-2 items-center mt-3'>
          <TouchableOpacity onPress={() => { }}>
            <FontAwesome
              name="search"
              size={18}
              color={searchValue
                ? COLORS.primaryOrangeHex
                : COLORS.primaryLightGreyHex}
              className=''
            />
          </TouchableOpacity>
          <TextInput
            placeholder='Find Your Coffee...'
            value={searchValue}
            onChangeText={(value: string) => setSearchValue(value)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            className='ml-2 font-pmedium flex-1 text-white'
            textAlignVertical='bottom'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home