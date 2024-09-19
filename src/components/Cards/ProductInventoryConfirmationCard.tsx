import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProductInventoryConfirmationCardTheme } from '../../theme/UI/cardsStyles';
import ProductInterface, { ProductInterfaceBag } from '../../interface/product.js';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface ProductInventoryConfirmationCardInterface {
    product: ProductInterfaceBag;
    onClick?: () => void;
    disabled: boolean
}

export const ProductInventoryConfirmationCard = ({
    product,
    onClick,
    disabled
}: ProductInventoryConfirmationCardInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'light' ? theme.text_color : theme.color_tertiary

    return (
        <TouchableOpacity style={ProductInventoryConfirmationCardTheme(theme, typeTheme).ProductInventoryConfirmationCard} onPress={onClick} disabled={disabled}>
            <View style={ProductInventoryConfirmationCardTheme(theme).data}>
                <View style={ProductInventoryConfirmationCardTheme(theme).information}>
                    <View>
                        <Text style={ProductInventoryConfirmationCardTheme(theme).description}>{product.producto}</Text>
                    </View>

                    <View style={ProductInventoryConfirmationCardTheme(theme).dataItem}>
                        <Text style={ProductInventoryConfirmationCardTheme(theme).label}>Clave:</Text>
                        <Text style={ProductInventoryConfirmationCardTheme(theme).dataItemText}>{product?.clave}</Text>
                    </View>

                    <View style={ProductInventoryConfirmationCardTheme(theme).dataItem}>
                        <Text style={ProductInventoryConfirmationCardTheme(theme).label}>Piezas:</Text>
                        <Text style={ProductInventoryConfirmationCardTheme(theme).dataItemText}>{product?.cantidad} / {product.unidad_nombre}</Text>
                    </View>
                </View>

                <View style={ProductInventoryConfirmationCardTheme(theme, typeTheme).edit}>
                    <Icon name="chevron-down-outline" size={20} color={iconColor} />
                </View>

            </View>
        </TouchableOpacity>
    )
}
