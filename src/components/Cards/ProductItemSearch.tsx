import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PorductInterface from '../../interface/product';

interface ProductItemSearchInterface {
    product: PorductInterface;
    showDelete?: boolean;
    onDelete?: (product: PorductInterface) => void;
    onClick?: () => void
}

export const ProductItemSearch = ({
    product,
    onClick
}: ProductItemSearchInterface) => {
    return (
        <TouchableOpacity style={styles.ProductItemSearch} onPress={onClick}>
            <View>
                <Text>{product.Descripcion}</Text>
            </View>
            <View>
                <Text>Codigo: {product.Codigo}</Text>
                <Text>Marca: {product.Marca}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    ProductItemSearch: {
        marginBottom: 20,
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    }
})
