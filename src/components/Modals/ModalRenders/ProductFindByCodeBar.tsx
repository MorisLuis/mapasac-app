import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PorductInterface from '../../../interface/product'
import { ProductInventoryCard } from '../../Cards/ProductInventoryCard'

interface ProductFindByCodeBarInterface {
    products: PorductInterface[];
    onClick?: (product: PorductInterface) => void;
}

export const ProductFindByCodeBar = ({
    products,
    onClick
}: ProductFindByCodeBarInterface) => {

    return (
        <View style={styles.ProductFindByCodeBar}>
            <Text style={styles.title}>Productos</Text>
            {
                products?.map((product) =>
                    <ProductInventoryCard
                        key={`${product.Codigo}-${product.Id_Marca}`}
                        product={product}
                        onClick={() => onClick?.(product)}
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({

    ProductFindByCodeBar: {
        width: "auto",
        //height: "20%"
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: "bold"
    },
    productStyles: {
        backgroundColor: 'beige',
        height: 30,
        color: "black"
    }
})