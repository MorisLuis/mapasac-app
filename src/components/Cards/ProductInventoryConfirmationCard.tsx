import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ProductInventoryConfirmationCardTheme } from '../../theme/UI/cardsStyles';
import ProductInterface from '../../interface/product.js';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

interface ProductInventoryConfirmationCardInterface {
    product: ProductInterface;
    onClick?: () => void;
    disabled: boolean
}

export const ProductInventoryConfirmationCard = ({
    product,
    onClick,
    disabled
}: ProductInventoryConfirmationCardInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = theme.color_tertiary

    return (
        <View style={ProductInventoryConfirmationCardTheme(theme, typeTheme).ProductInventoryConfirmationCard}>
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
                        <Text style={ProductInventoryConfirmationCardTheme(theme).dataItemText}>{product?.cantidad}</Text>
                    </View>
                </View>

                <TouchableOpacity style={ProductInventoryConfirmationCardTheme(theme, typeTheme).edit}  onPress={onClick} disabled={disabled}>
                    <Icon name="create-outline" size={18} color={iconColor} />
                </TouchableOpacity>

            </View>
        </View>
    )
}
