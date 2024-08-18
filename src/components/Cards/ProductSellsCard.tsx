import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../theme/UI/cardsStyles';
import { useTheme } from '../../context/ThemeContext';
import { quantityFormat } from '../../utils/quantityFormat';
import { ProductSellsInterface } from '../../interface/productSells';
import { format } from '../../utils/currency';

interface ProductSellsCardInterface {
    product: ProductSellsInterface;
    showDelete?: boolean;
    onDelete?: (product: ProductSellsInterface) => void;
    onClick?: () => void
}

export const ProductSellsCard = ({
    product,
    showDelete,
    onDelete,
    onClick
}: ProductSellsCardInterface) => {

    const { theme, typeTheme } = useTheme();

    return (
        <TouchableOpacity style={styles(theme, typeTheme).productInventoryCard} onPress={onClick}>
            <View style={styles(theme).productInventoryCard__data}>
                <View style={styles(theme).information}>
                    <View>
                        <Text style={styles(theme).description}>{product.producto}</Text>
                    </View>

                    {
                        product?.capa?.trim() !== "" ?
                            <View style={styles(theme).dataItem}>
                                <Text style={styles(theme).label}>Clase:</Text>
                                <Text style={styles(theme).dataItemText}>{product?.capa}</Text>
                            </View>
                            :
                            <View style={styles(theme).dataItem}>
                                <Text style={styles(theme).label}>Clase:</Text>
                                <Text style={styles(theme).dataItemText}>{product?.clase}</Text>
                            </View>
                    }

                    <View style={styles(theme).dataItem}>
                        <Text style={styles(theme).label}>Precio:</Text>
                        <Text style={styles(theme).dataItemText}>{format(parseFloat(product?.precio as string))}</Text>
                    </View>
                    

                    {
                        showDelete && <Text style={styles(theme, typeTheme).delete} onPress={() => onDelete?.(product)}>Eliminar</Text>
                    }
                </View>

                <View style={styles(theme).quantity}>
                    {
                        product?.cantidad &&
                        <Text
                            style={styles(theme).quantity_value}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {quantityFormat(product?.cantidad)}
                        </Text>
                    }
                    <Text
                        style={styles(theme).quantity_unity}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {product.unidad_nombre?.trim()}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
