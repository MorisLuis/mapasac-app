import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ProductInventoryConfirmationCardTheme } from '../../theme/UI/cardsStyles';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductSellsInterface } from '../../interface/productSells';
import { format } from '../../utils/currency';
import CustomText from '../Ui/CustumText';

interface ProductSellsConfirmationCardInterface {
    product: ProductSellsInterface;
    onClick?: () => void;
    disabled: boolean
}

export const ProductSellsConfirmationCard = ({
    product,
    onClick,
    disabled
}: ProductSellsConfirmationCardInterface) => {

    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'light' ? theme.text_color : theme.color_tertiary;

    return (
        <TouchableOpacity style={ProductInventoryConfirmationCardTheme(theme, typeTheme).ProductInventoryConfirmationCard} onPress={onClick} disabled={disabled}>
            <View style={ProductInventoryConfirmationCardTheme(theme).data}>
                <View style={ProductInventoryConfirmationCardTheme(theme).information}>
                    <View>
                        <CustomText style={ProductInventoryConfirmationCardTheme(theme).description}>{product.producto}</CustomText>
                    </View>

                    <View style={ProductInventoryConfirmationCardTheme(theme).dataItem}>
                        <CustomText style={ProductInventoryConfirmationCardTheme(theme).label}>{product?.capa ? "Capa:" : "Clase:"}</CustomText>
                        <CustomText style={ProductInventoryConfirmationCardTheme(theme).dataItemText}>{product?.capa ? product?.capa : product?.clase}</CustomText>
                    </View>

                    <View style={ProductInventoryConfirmationCardTheme(theme).dataItem}>
                        <CustomText style={ProductInventoryConfirmationCardTheme(theme).label}>Piezas:</CustomText>
                        <CustomText style={ProductInventoryConfirmationCardTheme(theme).dataItemText}>{product?.cantidad} / {product.unidad_nombre}</CustomText>
                    </View>


                    <View style={ProductInventoryConfirmationCardTheme(theme).dataItem}>
                        <CustomText style={ProductInventoryConfirmationCardTheme(theme).label}>Precio:</CustomText>
                        <CustomText style={ProductInventoryConfirmationCardTheme(theme).dataItemText}>{format(parseFloat(product?.precio as string))}</CustomText>
                    </View>

                    <View style={ProductInventoryConfirmationCardTheme(theme).dataItem}>
                        <CustomText style={ProductInventoryConfirmationCardTheme(theme).label}>Importe:</CustomText>
                        <CustomText style={ProductInventoryConfirmationCardTheme(theme).dataItemText}>{format(parseFloat(product?.precio as string) * (product?.cantidad as number))}</CustomText>
                    </View>
                </View>

                <View style={ProductInventoryConfirmationCardTheme(theme, typeTheme).edit}>
                    <Icon name="chevron-down-outline" size={20} color={iconColor} />
                </View>

            </View>
        </TouchableOpacity>
    )
}
