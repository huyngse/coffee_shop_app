import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '@/store/store';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { COLORS } from '@/theme/theme';
import HeaderBar from '@/components/HeaderBar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CoffeeCard from '@/components/CoffeeCard';
import { CoffeeType } from '@/types';
const getCatesFromData = (data: CoffeeType[]) => {
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
const getCoffeeByCategory = (cate: string, coffeeList: CoffeeType[]) => {
  if (cate == "All") return coffeeList;
  return coffeeList.filter((coffee: CoffeeType) => coffee.name == cate);
}
// HOME PAGE
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
  const coffeeListRef: any = useRef<FlatList>();
  useEffect(() => {
    const cates = getCatesFromData(coffeeList);
    if (cates != null) {
      setCategories(cates);
      setCateIndex({
        index: 0,
        category: cates[0]
      })
      setSortedCoffee(getCoffeeByCategory("All", coffeeList));
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchCoffee(searchValue);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue])

  const StatusBar = () => {
    return (
      <ExpoStatusBar style='light' backgroundColor={COLORS.primaryBlackHex} />
    )
  }
  const searchCoffee = (value: string) => {
    if (value != null) {
      coffeeListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCateIndex({
        index: 0,
        category: 'All'
      })
      const searchResult = coffeeList.filter((item: any) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      }
      );
      setSortedCoffee(searchResult)
    }
  }
  const clearSearch = () => {
    coffeeListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCateIndex({
      index: 0,
      category: categories[0]
    });
    setSortedCoffee(coffeeList);
  }


  return (
    <SafeAreaView>
      <ScrollView className='bg-primaryBlack h-full p-3'>
        <HeaderBar />
        <Text className='text-white mt-5 text-2xl font-psemibold'>
          Find the best {'\n'}coffee for you
        </Text>
        {/* SEARCH BAR */}
        <View className='bg-gray-800 rounded-xl flex-row px-4 py-2 items-center mt-3'>
          {/* Search icon */}
          <FontAwesome
            name="search"
            size={18}
            color={searchValue
              ? COLORS.primaryOrangeHex
              : COLORS.primaryLightGreyHex}
            className=''
          />
          {/* Search coffee input */}
          <TextInput
            placeholder='Find Your Coffee...'
            value={searchValue}
            onChangeText={(value: string) => setSearchValue(value)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            className='ml-2 font-pmedium flex-1 text-white'
            textAlignVertical='bottom'
          />
          {/* Clear search button */}
          {
            searchValue && (
              <TouchableOpacity onPress={() => {
                setSearchValue("");
                clearSearch();
              }}>
                <FontAwesome name="close" size={18} color={COLORS.primaryLightGreyHex} />
              </TouchableOpacity>
            )
          }
        </View>
        {/* CATEGORRIES SCROLLER */}
        <ScrollView horizontal className='mt-5'>
          {
            categories.map((cate: string, index: number) => (
              <View className='px-2' key={cate}>
                <TouchableOpacity
                  onPress={() => {
                    setCateIndex({ index: index, category: cate });
                    coffeeListRef?.current?.scrollToOffset({
                      animated: true,
                      offset: 0,
                    });
                    setSortedCoffee(getCoffeeByCategory(cate, coffeeList));
                  }}
                  className='items-center'
                >
                  <Text
                    className={`font-psemibold text-sm ${cateIndex.index === index ? "text-orange-500" : "text-gray-500"}`}
                  >
                    {cate}
                  </Text>
                  {
                    cateIndex.index === index && (
                      <View className='w-full h-1  rounded-3xl bg-orange-500' />
                    )
                  }
                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>
        {/* COFFEE FLAT LIST */}
        <FlatList
          className='mt-2'
          horizontal
          data={sortedCoffee}
          ref={coffeeListRef}
          keyExtractor={(item: CoffeeType) => item.id}
          ListEmptyComponent={
            <View style={{
              width: Dimensions.get('window').width - 12,
            }}>
              <Text className='text-gray-600 font-pregular text-center my-10'>
                No coffee available
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <CoffeeCard
              coffeeData={item}
              onPressButton={() => { }}
            />
          )}
        />
        {/* BEAN FLAT LIST */}
        <Text className='font-psemibold text-white text-lg mt-3'>Coffee beans</Text>
        <FlatList
          className='mt-2'
          horizontal
          data={beanList}
          keyExtractor={(item: CoffeeType) => item.id}
          renderItem={({ item }) => (
            <CoffeeCard
              coffeeData={item}
              onPressButton={() => { }}
            />
          )}
        />
        <View className='py-10' />
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  )
}

export default Home