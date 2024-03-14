import React from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PorductInterface from '../../interface/product';
import { globalStyles } from '../../theme/appTheme';

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

    const imageDefault = 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2762&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    return (
        <TouchableOpacity style={styles.ProductItemSearch} onPress={onClick}>
            <Image
                style={styles.productInventoryCard__Image}
                source={{
                    uri: product.imagen ? product.imagen[0]?.url : imageDefault,
                }}
            />
            <View style={styles.information}>
                <Text style={styles.description}>{product.Descripcion}</Text>
                <View style={styles.otherInformation}>
                    <Text>Codigo: {product.Codigo}</Text>
                    <Text>-</Text>
                    <Text>Marca: {product.Marca}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    ProductItemSearch: {
        marginBottom: globalStyles.globalMarginBottomSmall.marginBottom,
        borderWidth: 0,
        paddingVertical: 10,
        borderRadius: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    productInventoryCard__Image: {
        width: 60,
        minHeight: 60,
        marginRight: 10,
        borderRadius: 5
    },
    information: {},
    description: {
        fontWeight: "bold"
    },
    otherInformation: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    }
})
