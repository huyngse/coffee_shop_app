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
    quantity?: number
}