import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const AddProduct = () => {

    useEffect(() => {
        console.log('Add product page');
    }, [])

    return (
        <SafeAreaView
            style={{
                padding: 10,
                paddingTop: 80
            }}>
            <Text>Agregar Producto Manual</Text>
        </SafeAreaView>
    )
}
