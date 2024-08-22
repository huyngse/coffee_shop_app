import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '@/store/store';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { COLORS } from '@/theme/theme';
import HeaderBar from '@/components/HeaderBar';
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
  const [searchValue, setSearchValue] = useState();
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
      <ScrollView className='bg-primaryBlack h-full'>
        <HeaderBar />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home