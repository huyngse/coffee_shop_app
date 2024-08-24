import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '@/data/CoffeeData';
import BeansData from '@/data/BeansData';
import { produce } from "immer"
import { CoffeeType } from '@/types';
export type CartState = {
    CartList: CoffeeCartItemType[],
    CartPrice: number,
    addToCart: (cartItem: CoffeeType) => void,
    calculateTotalPrice: () => void,
    updateItemQuantity: (itemId: string, size: string, quantity: number) => void,
    removeItem: (itemId: string, size: string) => void,
}
export type ProductState = {
    CoffeeList: CoffeeType[],
    BeanList: CoffeeType[],
}
export type ProfileState = {
    FavouritesList: CoffeeType[],
    addToFavourite: (itemToAdd: CoffeeType) => void,
    removeFromFavourite: (itemToRemove: CoffeeType) => void,
}
export type OrderState = {
    OrderHistory: any[],
}
export type CoffeeCartItemType = {
    itemId: string,
    size: string,
    price: number,
    quantity: number,
}
// If some bug happened, try merge all the store into one
export const useProductStore = create<ProductState>()(
    persist(
        () => ({
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
            addToFavourite: (itemToAdd: CoffeeType) => set(produce((state: ProfileState) => {
                let isAdded = state.FavouritesList.find((item: CoffeeType) => item.id == itemToAdd.id) != null;
                if (!isAdded) {
                    state.FavouritesList.unshift(itemToAdd);
                }
            })),
            removeFromFavourite: (itemToRemove: CoffeeType) => set(produce((state: ProfileState) => {
                state.FavouritesList = state.FavouritesList.filter((item: CoffeeType) => item.id != itemToRemove.id);
            })),
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
            CartList: emptyArray,
            CartPrice: 0,
            addToCart: (itemToAdd: CoffeeType) => set(produce((state: CartState) => {
                let isFound = false;
                for (let i = 0; i < state.CartList.length; i++) {
                    const cartItem = state.CartList[i];
                    if (cartItem.itemId === itemToAdd.id && itemToAdd.prices[0].size === cartItem.size) {
                        isFound = true;
                        state.CartList[i].quantity++;
                        break;
                    }
                }
                if (isFound == false) {
                    state.CartList.push(
                        {
                            itemId: itemToAdd.id,
                            size: itemToAdd.prices[0].size,
                            price: parseFloat(itemToAdd.prices[0].price),
                            quantity: 1,
                        }
                    );
                }
            })), // End addToCart function
            calculateTotalPrice: () => set(produce((state: CartState) => {
                let totalPrice = 0;
                for (let i = 0; i < state.CartList.length; i++) {
                    const cartItem = state.CartList[i];
                    totalPrice += cartItem.price * cartItem.quantity;
                }
                state.CartPrice = totalPrice;
            })),
            updateItemQuantity: (itemId: string, size: string, quantity: number) => set(produce((state: CartState) => {
                for (let i = 0; i < state.CartList.length; i++) {
                    const cartItem = state.CartList[i];
                    if (cartItem.itemId === itemId && cartItem.size === size) {
                        state.CartList[i].quantity = quantity;
                        break;
                    }
                }
            })),
            removeItem: (itemId: string, size: string) => set(produce((state: CartState) => {
                state.CartList = state.CartList.filter((item: CoffeeCartItemType) => item.itemId != itemId || item.size != size);
            })),
        }),
        {
            name: 'cart',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);