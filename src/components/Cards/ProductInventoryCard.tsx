import React from 'react';

import { styles } from '../../theme/UI/cardsStyles';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import PorductInterface from '../../interface/product.js';

interface ProductInventoryCardInterface {
    product: PorductInterface;
    showDelete?: boolean;
    onDelete?: (product: PorductInterface) => void;
    onClick?: () => void 
}

export const ProductInventoryCard = ({
    product,
    showDelete,
    onDelete,
    onClick
}: ProductInventoryCardInterface) => {

    return (
        <TouchableOpacity style={styles.productInventoryCard} onPress={onClick}>
            <Image
                style={styles.productInventoryCard__Image}
                source={{
                    uri: product.imagen[0].url,
                }}
            />
            <View style={styles.productInventoryCard__data}>
                <View style={styles.information}>
                    <Text style={styles.description}>{product.Descripcion}</Text>
                    <Text>Codigo: {product?.Codigo}</Text>
                    <Text>Id_Marca: {product?.Id_Marca}</Text>
                    <Text>Marca: {product?.Marca}</Text>

                    <Text>Almacen: {product?.Id_Almacen}</Text>

                    {
                        showDelete && <Text style={styles.delete} onPress={() => onDelete?.(product)}>Eliminar</Text>
                    }
                </View>

                <View style={styles.stock}>
                    <Text>{product.Piezas || product.Existencia}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
