import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '@/data/CoffeeData';
import BeansData from '@/data/BeansData';
import { produce } from "immer"
import { CoffeePriceType, CoffeeType } from '@/types';
export type CartState = {
    CartList: CoffeeType[],
    CartPrice: number,
    addToCart: (cartItem: CoffeeType) => void,
    calculateTotalPrice: () => void,
}
export type ProductState = {
    CoffeeList: CoffeeType[],
    BeanList: CoffeeType[],
}
export type ProfileState = {
    FavouritesList: any[],
}
export type OrderState = {
    OrderHistory: any[],
}
// If some bug happened, try merge all the store into one
export const useProductStore = create<ProductState>()(
    persist(
        (set) => ({
            CoffeeList: CoffeeData,
            BeanList: BeansData,
        }),
        {
            name: 'products',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)
const emptyArray: any[] = [];

export const useProfileStore = create<ProfileState>()(
    persist(
        (set) => ({
            FavouritesList: emptyArray,
        }),
        {
            name: 'profile',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)
export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            OrderHistory: emptyArray,
        }),
        {
            name: 'profile',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)
export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            CartList: [],
            CartPrice: 0,
            addToCart: (itemToAdd: CoffeeType) => set(produce((state: CartState) => {
                // Check if item already added
                let isFound = false;
                for (let i = 0; i < state.CartList.length; i++) {
                    const cartItem = state.CartList[i];
                    if (cartItem.id == itemToAdd.id) {
                        isFound = true;
                        // Check if size already added
                        let isSameSize = false;
                        for (let j = 0; j < cartItem.prices.length; j++) {
                            const price = itemToAdd.prices[j];
                            // If size item already added then increase quantity
                            if (price.size == itemToAdd.prices[0].size) {
                                isSameSize = true;
                                if (state.CartList[i].prices[j].quantity == undefined) {
                                    state.CartList[i].prices[j].quantity = 0;
                                }
                                state.CartList[i].prices[j].quantity!++;
                                break;
                            }
                        } // End for each size of item
                        // Else size item is not added
                        if (isSameSize == false) {
                            state.CartList[i].prices.push(cartItem.prices[0]);
                        }
                        // Sort sizes
                        state.CartList[i].prices.sort((a: CoffeePriceType, b: CoffeePriceType) => {
                            if (a.size > b.size) {
                                return -1;
                            } else if (a.size < b.size) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });
                        break;
                    }
                    if (isFound == false) {
                        state.CartList.push(itemToAdd);
                    }
                } // End for each cart item
            })), // End addToCart function
            calculateTotalPrice: () => {

            }
        }),
        {
            name: 'cart',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);