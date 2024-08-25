import { ImageProps } from "react-native"

export type CoffeeType = {
    id: string,
    name: string,
    description: string,
    roasted: string,
    imagelink_square: ImageProps,
    imagelink_portrait: ImageProps,
    ingredients: string,
    special_ingredient: string,
    prices: CoffeePriceType[],
    average_rating: number,
    ratings_count: string,
    favourite: boolean,
    type: string,
    index: number
}
export type CoffeePriceType = {
    size: string,
    price: string,
    currency: string,
}

export type OrderItem = {
    id: string,
    name: string,
    special_ingredient: string,
    imagelink_square: ImageProps,
    roasted: string,
    prices: {
        size: string,
        price: number,
        currency: string,
        quantity: number,
    }[],
    totalPrice: number
}
export type OrderType = {
    orderDate: string,
    items: OrderItem[],
    totalPrice: number,
}