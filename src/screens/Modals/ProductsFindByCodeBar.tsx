import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PorductInterface from '../../interface/product';
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard';
import ModalMiddle from '../../components/Modals/ModalMiddle';
import { useNavigation } from '@react-navigation/native';
import { ProductFindByCodebarInputStyles } from '../../theme/ModalRenders/ProductFindByCodebarInputTheme';
import { useTheme } from '../../context/ThemeContext';

interface ProductFindByCodeBarInterface {
    route?: {
        params: {
            products: PorductInterface[];
        };
    };
}

export const ProductsFindByCodeBar = ({ route }: ProductFindByCodeBarInterface) => {

    const { products } = route?.params || {}
    const navigation = useNavigation<any>();
    const { theme } = useTheme();

    const onSelectProduct = (product: PorductInterface) => {
        navigation.goBack()
        navigation.navigate('[Modal] - scannerResultScreen', { product: product })
    }

    if (!products) return;

    return (
        <ModalMiddle
            visible={true}
            onClose={() => navigation.goBack()}
        >
            <View style={ProductFindByCodebarInputStyles(theme).ProductFindByCodeBar}>
                <Text style={ProductFindByCodebarInputStyles(theme).title}>Productos</Text>
                {
                    products.map((product) =>
                        <ProductInventoryCard
                            key={`${product.Codigo}-${product.Id_Marca}-${product.Id_Almacen}`}
                            product={product}
                            onClick={() => onSelectProduct(product)}
                        />
                    )
                }
            </View>
        </ModalMiddle>
    )
}
