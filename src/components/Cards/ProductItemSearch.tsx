import React from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PorductInterface from '../../interface/product';
import { colores, globalFont, globalStyles } from '../../theme/appTheme';

interface ProductItemSearchInterface {
    product: PorductInterface;
    showDelete?: boolean;
    onDelete?: (product: PorductInterface) => void;
    onClick?: () => void;
    fromModal?: boolean
}

export const ProductItemSearch = ({
    product,
    onClick,
    fromModal
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
                {
                    fromModal &&
                    <View style={[product.CodBar ? styles.codebarAvailable : styles.codebarNotAvailable]}>
                        <Text style={product.CodBar ? styles.textAvailable : styles.textNotAvailable}>
                            {product.CodBar ? "Tiene código" : "No tiene código"}
                        </Text>
                    </View>

                }
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
        alignItems: "center",

    },
    productInventoryCard__Image: {
        width: 60,
        minHeight: 60,
        marginRight: 10,
        borderRadius: 5
    },
    information: {
        alignItems: 'flex-start' 
    },
    description: {
        fontWeight: "bold"
    },
    otherInformation: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    },
    codebarAvailable: {
        backgroundColor: colores.color_border_tertiary + '23',
        padding: 3,
        paddingHorizontal: 6,
        borderRadius: 10,
        marginVertical: 4
    },
    textAvailable: {
        color: colores.color_border_tertiary ,
    },
    codebarNotAvailable: {
        backgroundColor: colores.color_red + '43',
        padding: 3,
        paddingHorizontal: 6,
        borderRadius: 10,
        marginVertical: 4
    },
    textNotAvailable: {
        color: colores.color_red,
    }
})
