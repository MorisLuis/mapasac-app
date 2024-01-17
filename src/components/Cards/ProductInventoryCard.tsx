import React from 'react';

import { styles } from '../../theme/UI/cardsStyles.tsx';
import { Image, Text, View } from 'react-native';
import PorductInterface from '../../interface/product.ts';

interface ProductInventoryCardInterface {
    product: PorductInterface;
    showDelete?: boolean;
    onDelete?: (product: PorductInterface) => void;
}

export const ProductInventoryCard = ({
    product,
    showDelete,
    onDelete
} : ProductInventoryCardInterface) => {

    return (
        <View style={styles.productInventoryCard}>
            <Image
                style={styles.productInventoryCard__Image}
                source={{
                    uri: 'https://images.unsplash.com/photo-1704402838495-7d2ac0798b8d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
            />
            <View style={styles.productInventoryCard__data}>
                <View>
                    <Text>{product.Descripcion}</Text>
                    <Text>Codigo: {product.Codigo}</Text>
                    <Text>Familia: {product.Familia}</Text>

                    {
                        showDelete && <Text style={styles.delete} onPress={() => onDelete?.(product)}>Eliminar</Text>
                    }
                </View>

                <View style={styles.productInventoryCard__stock}>
                    <Text>{product.Piezas}</Text>
                </View>
            </View>
        </View>
    )
}
