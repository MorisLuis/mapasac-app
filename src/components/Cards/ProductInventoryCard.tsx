import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../theme/UI/cardsStyles';
import PorductInterface from '../../interface/product.js';
import { useTheme } from '../../context/ThemeContext';

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

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return (
        <TouchableOpacity style={styles(theme, typeTheme).productInventoryCard} onPress={onClick}>
            {/* {
                product?.imagen ? 
                    <Image
                        style={styles(theme).productInventoryCard__Image}
                        source={{
                            uri: product?.imagen[0]?.url
                        }}
                    />
                    :
                    <View style={styles(theme).notImage}>
                        <Icon name={'camera'} size={20} color={typeTheme}/>
                        <Text style={styles(theme).notImageText} numberOfLines={2}>{user?.Company || "Olei"}</Text>
                    </View>
            } */}
            <View style={styles(theme).productInventoryCard__data}>
                <View style={styles(theme).information}>
                    <View>
                        <Text style={styles(theme).description}>{product.Descripcion}</Text>
                    </View>

                    <View style={styles(theme).dataItem}>
                        <Text style={styles(theme).label}>Codigo:</Text>
                        <Text style={styles(theme).dataItemText}>{product?.Codigo}</Text>
                    </View>

                    <View style={styles(theme).dataItem}>
                        <Text style={styles(theme).label}>Marca:</Text>
                        <Text style={styles(theme).dataItemText}>{product?.Marca}</Text>
                    </View>

                    {
                        showDelete && <Text style={styles(theme).delete} onPress={() => onDelete?.(product)}>Eliminar</Text>
                    }
                </View>

                <View style={styles(theme, typeTheme).stock}>
                    <Text style={{ color: theme.text_color }}>{product.Piezas || product.Existencia}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
