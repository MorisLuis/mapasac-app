import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../theme/UI/cardsStyles';
import ProductInterface from '../../interface/product.js';
import { useTheme } from '../../context/ThemeContext';

interface ProductInventoryCardInterface {
    product: ProductInterface;
    showDelete?: boolean;
    onDelete?: (product: ProductInterface) => void;
    onClick?: () => void
}

export const ProductInventoryCard = ({
    product,
    showDelete,
    onDelete,
    onClick
}: ProductInventoryCardInterface) => {

    const { theme, typeTheme } = useTheme();

    return (
        <TouchableOpacity style={styles(theme, typeTheme).productInventoryCard} onPress={onClick}>
            <View style={styles(theme).productInventoryCard__data}>
                <View style={styles(theme).information}>
                    <View>
                        <Text style={styles(theme).description}>{product.producto}</Text>
                    </View>

                    <View style={styles(theme).dataItem}>
                        <Text style={styles(theme).label}>Clave:</Text>
                        <Text style={styles(theme).dataItemText}>{product?.clave}</Text>
                    </View>

                    {
                        showDelete && <Text style={styles(theme).delete} onPress={() => onDelete?.(product)}>Eliminar</Text>
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}
