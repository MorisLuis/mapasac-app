import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../../theme/UI/cardsStyles';
import ProductInterface from '../../interface/product.js';
import { useTheme } from '../../context/ThemeContext';
import { quantityFormat } from '../../utils/quantityFormat';
import CustomText from '../Ui/CustumText';
import { globalFont } from '../../theme/appTheme';

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
    const iconColor = typeTheme === 'dark' ? "white" : theme.color_red

    return (
        <TouchableOpacity style={styles(theme, typeTheme).productInventoryCard} onPress={onClick}>
            <View style={styles(theme).productInventoryCard__data}>
                <View style={styles(theme).information}>
                    <View>
                        <CustomText style={styles(theme).description}>{product.producto}</CustomText>
                    </View>

                    <View style={styles(theme).dataItem}>
                        <CustomText style={styles(theme).label}>Clave:</CustomText>
                        <CustomText style={styles(theme).dataItemText}>{product?.clave}</CustomText>
                    </View>

                    {
                        (product?.codbarras && product?.codbarras.trim() !== '') &&
                        <View style={styles(theme).dataItem}>
                            <CustomText style={styles(theme).label}>Codigo Barras:</CustomText>
                            <CustomText style={styles(theme).dataItemText}>{product?.codbarras}</CustomText>
                        </View>
                    }

                    {
                        showDelete &&
                        <View style={styles(theme).deleteContainer}>
                            <Icon name={'close-circle'} size={globalFont.font_normal} color={iconColor} />
                            <CustomText style={styles(theme, typeTheme).delete} onPress={() => onDelete?.(product)}>Eliminar</CustomText>
                        </View>
                    }
                </View>
                <View style={styles(theme).quantity}>
                    {
                        product?.cantidad &&
                        <CustomText
                            style={styles(theme).quantity_value}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {quantityFormat(product?.cantidad)}
                        </CustomText>
                    }
                    <CustomText
                        style={styles(theme).quantity_unity}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {product.unidad_nombre?.trim()}
                    </CustomText>
                </View>
            </View>
        </TouchableOpacity>
    )
}
