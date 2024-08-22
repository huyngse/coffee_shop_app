import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '@/data/CoffeeData';
import BeansData from '@/data/BeansData';
export const useStore = create(
    persist(
        (get, set) => ({
            CoffeeList: CoffeeData,
            BeanList: BeansData,
            FavouritesList: [],
            CartList: [],
            CartPrice: 0,
            OrderHistory: [],
        }),
        {
            name: 'coffee-app',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);