import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Inventory = () => {

    useEffect(() => {
        console.log('Inventary');
    }, [])


    return (
        <SafeAreaView style={{
            padding: 10,
            paddingTop: 30
        }}>
            <Text style={{
                //marginBottom: 10
            }}>
                Inventorio / lista de productos
            </Text>
            <ProductInventoryCard />
            <ProductInventoryCard />
        </SafeAreaView>
    )
}
