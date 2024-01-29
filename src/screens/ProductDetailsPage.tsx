import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ProductDetailsPage = () => {
    const navigation = useNavigation();

    // Función para navegar de regreso a Inventario
    const navigateBackToInventario = () => {
        navigation.goBack();
    };


    return (
        <TouchableOpacity onPress={navigateBackToInventario}>
            <Text>Navegar a InventaryDetails</Text>
        </TouchableOpacity>
    )
}
