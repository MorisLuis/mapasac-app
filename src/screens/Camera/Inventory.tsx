import React from 'react'
import { View, Text } from 'react-native'
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard'

export const Inventory = () => {
    return (
        <View style={{
            padding: 10
        }}>
            <Text style={{
                marginBottom: 10
            }}>
                Inventorio / lista de productos
            </Text>
            <ProductInventoryCard />
            <ProductInventoryCard />
        </View>
    )
}
