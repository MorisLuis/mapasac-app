import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getProductDetails } from '../services/products';
import PorductInterface from '../interface/product';

export const ProductDetailsPage = ({ route }: any) => {

    const { selectedProduct: { Codigo, Marca } } = route.params;
    const navigation = useNavigation();
    const [productDetails, setProductDetails] = useState<PorductInterface>()

    // Función para navegar de regreso a Inventario
    const navigateBackToInventario = () => {
        navigation.goBack();
    };


    const handleGetProductDetails = async () => {
        const productData = await getProductDetails(Codigo, Marca);
        setProductDetails(productData)
    }

    useEffect(() => {
        handleGetProductDetails()
    }, [])


    return (
        <TouchableOpacity onPress={navigateBackToInventario}>
            <Text>Navegar a InventaryDetails</Text>
            <Text>
                {
                    JSON.stringify(productDetails)
                }
            </Text>
        </TouchableOpacity>
    )
}
