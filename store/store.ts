import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '@/data/CoffeeData';
import BeansData from '@/data/BeansData';
import { produce } from "immer"
import { CoffeeType, OrderItem, OrderType } from '@/types';
import { ImageProps } from 'react-native';
export type CartState = {
    CartList: CoffeeCartItemType[],
    CartPrice: number,
    addToCart: (cartItem: CoffeeType) => void,
    calculateTotalPrice: () => void,
    updateItemQuantity: (itemId: string, size: string, quantity: number) => void,
    removeItem: (itemId: string, size: string) => void,
    clearItem: () => void,
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
    OrderHistory: OrderType[],
    createOrder: (cartItems: OrderItem[], paymentMethod: string) => void,
}
export type CoffeeCartItemType = {
    itemId: string,
    name: string,
    special_ingredient: string,
    imagelink_square: ImageProps,
    roasted: string,
    size: string,
    type: string,
    price: number,
    currency: string,
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
            createOrder: (cartItems: OrderItem[], paymentMethod: string) => set(produce((state: OrderState) => {
                let totalPrice = cartItems.reduce((accumulator: number, currentValue: OrderItem) => accumulator + currentValue.totalPrice, 0);
                state.OrderHistory.unshift({
                    orderDate: new Date().toISOString(),
                    items: cartItems,
                    totalPrice: totalPrice,
                    paymentMethod: paymentMethod,
                })
            }))
        }),
        {
            name: 'profile',
            storage: createJSONStorage(() => AsyncStorage)
        },
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
                            name: itemToAdd.name,
                            roasted: itemToAdd.roasted,
                            imagelink_square: itemToAdd.imagelink_square,
                            special_ingredient: itemToAdd.special_ingredient,
                            size: itemToAdd.prices[0].size,
                            price: parseFloat(itemToAdd.prices[0].price),
                            quantity: 1,
                            currency: itemToAdd.prices[0].currency,
                            type: itemToAdd.type,
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
            clearItem: () => set(produce((state: CartState) => {
                state.CartList = emptyArray;
            }))
        }),
        {
            name: 'cart',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);

export const convertCartItemToOrderItem = (
    cartItems: CoffeeCartItemType[],
) => {
    const convertedList: OrderItem[] = [];
    for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        let isFound = false;
        for (let j = 0; j < convertedList.length; j++) {
            const convertedItem = convertedList[j];
            if (convertedItem.id == cartItem.itemId) {
                isFound = true;
                convertedItem.prices.push({
                    currency: cartItem.currency,
                    price: cartItem.price,
                    quantity: cartItem.quantity,
                    size: cartItem.size
                });
                convertedItem.totalPrice += cartItem.quantity * cartItem.price;
                break;
            }
        }
        if (!isFound) {
            convertedList.push({
                id: cartItem.itemId,
                imagelink_square: cartItem.imagelink_square,
                name: cartItem.name,
                roasted: cartItem.roasted,
                special_ingredient: cartItem.special_ingredient,
                totalPrice: cartItem.price * cartItem.quantity,
                type: cartItem.type,
                prices: [
                    {
                        currency: cartItem.currency,
                        price: cartItem.price,
                        quantity: cartItem.quantity,
                        size: cartItem.size
                    }
                ]
            })
        }
    }
    for (let i = 0; i < convertedList.length; i++) {
        const item = convertedList[i];
        item.prices.sort((a, b) => {
            if (a.size > b.size) {
                return -1;
            } else if (a.size < b.size) {
                return 1;
            } else {
                return 0;
            }
        });
    }
    return convertedList;
}