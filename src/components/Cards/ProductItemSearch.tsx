import React from 'react';

import { TouchableOpacity, View } from 'react-native';
import ProductInterface from '../../interface/product';
import { ProductItemSearchStyles } from '../../theme/UI/cardsStyles';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../Ui/CustumText';

interface ProductItemSearchInterface {
    product: ProductInterface;
    showDelete?: boolean;
    onDelete?: (product: ProductInterface) => void;
    onClick?: () => void;
    fromModal?: boolean
}

export const ProductItemSearch = ({
    product,
    onClick,
    fromModal
}: ProductItemSearchInterface) => {
    const { theme, typeTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black"

    return (
        <TouchableOpacity style={ProductItemSearchStyles(theme, typeTheme).ProductItemSearch} onPress={onClick}>
            <View style={ProductItemSearchStyles(theme, typeTheme).information}>
                <CustomText style={ProductItemSearchStyles(theme, typeTheme).description}>{product.producto}</CustomText>
                <View style={ProductItemSearchStyles(theme, typeTheme).otherInformation}>
                    <CustomText style={ProductItemSearchStyles(theme, typeTheme).otherInformationText}>Codigo: {product.clave.trim()}</CustomText>
                    <CustomText style={ProductItemSearchStyles(theme, typeTheme).otherInformationText}>-</CustomText>
                    <CustomText style={ProductItemSearchStyles(theme, typeTheme).otherInformationText}>Familia: {product.familia}</CustomText>
                </View>
                {
                    fromModal &&
                    <View style={[product.codbarras ? ProductItemSearchStyles(theme, typeTheme).codebarAvailable : ProductItemSearchStyles(theme, typeTheme).codebarNotAvailable]}>
                        <CustomText style={product.codbarras ? ProductItemSearchStyles(theme, typeTheme).textAvailable : ProductItemSearchStyles(theme, typeTheme).textNotAvailable}>
                            {
                                product.codbarras && product?.codbarras?.trim() !== "" ? "Tiene código" : "No tiene código"
                            }
                        </CustomText>
                    </View>

                }
            </View>
        </TouchableOpacity>
    )
}