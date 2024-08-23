import { View, Text, ScrollView, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputChangeEventData, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '@/store/store';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { COLORS } from '@/theme/theme';
import HeaderBar from '@/components/HeaderBar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CoffeeCard from '@/components/CoffeeCard';
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
  useEffect(() => {
    const cates = getCatesFromData(coffeeList);
    if (cates != null) {
      setCategories(cates);
      setCateIndex({
        index: 0,
        category: cates[0]
      })
    }
  }, []);
  useEffect(() => {
    onCategoryChange();
  }, [cateIndex]);

  const onCategoryChange = () => {
    setSortedCoffee(getCoffeeByCategory(cateIndex.category, coffeeList));
  }
  const StatusBar = () => {
    return (
      <ExpoStatusBar style='light' backgroundColor={COLORS.primaryBlackHex} />
    )
  }

  return (
    <SafeAreaView>
      <ScrollView className='bg-primaryBlack h-full p-3'>
        <HeaderBar />
        <Text className='text-white mt-8 text-2xl font-psemibold'>
          Find the best {'\n'}coffee for you
        </Text>
        {/* SEARCH BAR */}
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
        {/* CATEGORRIES SCROLLER */}
        <ScrollView horizontal className='mt-5'>
          {
            categories.map((cate: string, index: number) => (
              <View className='px-2' key={cate}>
                <TouchableOpacity
                  onPress={() => {
                    setCateIndex({ index: index, category: cate });
                    onCategoryChange();
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
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => (
              <CoffeeCard
                id={item.id}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                image={item.imagelink_square}
                name={item.name}
                specialIngredient={item.special_ingredient}
                averageRating={item.average_rating}
                prices={item.prices}
                onPressButton={() => { }}
              />
          )}
        />
        {/* BEAN FLAT LIST */}
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  )
}

export default Home