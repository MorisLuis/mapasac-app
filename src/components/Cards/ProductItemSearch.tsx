import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import ProductInterface from '../../interface/product';
import { ProductItemSearchStyles } from '../../theme/UI/cardsStyles';
import { useTheme } from '../../context/ThemeContext';

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
            {/* {
                product?.imagen ?
                    <Image
                        style={ProductItemSearchStyles(theme, typeTheme).productInventoryCard__Image}
                        source={{
                            uri: product?.imagen[0]?.url
                        }}
                    />
                    :
                    <View style={ProductItemSearchStyles(theme, typeTheme).notImage}>
                        <Icon name={'camera'} size={hp("3%")} color={typeTheme, typeTheme} />
                        <Text style={ProductItemSearchStyles(theme, typeTheme).notImageText} numberOfLines={2}>{user?.Company || "Olei"}</Text>
                    </View>
            } */}
            <View style={ProductItemSearchStyles(theme, typeTheme).information}>
                <Text style={ProductItemSearchStyles(theme, typeTheme).description}>{product.producto}</Text>
                <View style={ProductItemSearchStyles(theme, typeTheme).otherInformation}>
                    <Text style={ProductItemSearchStyles(theme, typeTheme).otherInformationText}>Codigo: {product.clave.trim()}</Text>
                    <Text style={ProductItemSearchStyles(theme, typeTheme).otherInformationText}>-</Text>
                    <Text style={ProductItemSearchStyles(theme, typeTheme).otherInformationText}>Familia: {product.familia}</Text>
                </View>
                {
                    fromModal &&
                    <View style={[product.codbarras ? ProductItemSearchStyles(theme, typeTheme).codebarAvailable : ProductItemSearchStyles(theme, typeTheme).codebarNotAvailable]}>
                        <Text style={product.codbarras ? ProductItemSearchStyles(theme, typeTheme).textAvailable : ProductItemSearchStyles(theme, typeTheme).textNotAvailable}>
                            {
                                product.codbarras && product?.codbarras?.trim() !== "" ? "Tiene código" : "No tiene código"
                            }
                        </Text>
                    </View>

                }
            </View>
        </TouchableOpacity>
    )
}