import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PorductInterface from '../../interface/product';
import { ProductInventoryCard } from '../../components/Cards/ProductInventoryCard';
import ModalMiddle from '../../components/Modals/ModalMiddle';
import { useNavigation } from '@react-navigation/native';

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

    const onSelectProduct = (product: PorductInterface) => {
        navigation.goBack()
        navigation.navigate('[Modal] - scannerResultScreen', { product: product })
    }

    if (!products) return;

    return (
        <ModalMiddle
            visible={true}
            onClose={() => {
                navigation.goBack()
            }}
        >

            <View style={styles.ProductFindByCodeBar}>
                <Text style={styles.title}>Productos</Text>
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

const styles = StyleSheet.create({

    ProductFindByCodeBar: {
        width: "auto",
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