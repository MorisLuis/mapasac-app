import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import PorductInterface from '../../interface/product';
import { ProductItemSearchStyles } from '../../theme/UI/cardsStyles';
import { useTheme } from '../../context/ThemeContext';

interface ProductItemSearchInterface {
    product: PorductInterface;
    showDelete?: boolean;
    onDelete?: (product: PorductInterface) => void;
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
        <TouchableOpacity style={ProductItemSearchStyles(theme).ProductItemSearch} onPress={onClick}>
            {/* {
                product?.imagen ?
                    <Image
                        style={ProductItemSearchStyles(theme).productInventoryCard__Image}
                        source={{
                            uri: product?.imagen[0]?.url
                        }}
                    />
                    :
                    <View style={ProductItemSearchStyles(theme).notImage}>
                        <Icon name={'camera'} size={hp("3%")} color={typeTheme} />
                        <Text style={ProductItemSearchStyles(theme).notImageText} numberOfLines={2}>{user?.Company || "Olei"}</Text>
                    </View>
            } */}
            <View style={ProductItemSearchStyles(theme).information}>
                <Text style={ProductItemSearchStyles(theme).description}>{product.Descripcion}</Text>
                <View style={ProductItemSearchStyles(theme).otherInformation}>
                    <Text style={ProductItemSearchStyles(theme).otherInformationText}>Codigo: {product.Codigo}</Text>
                    <Text style={ProductItemSearchStyles(theme).otherInformationText}>-</Text>
                    <Text style={ProductItemSearchStyles(theme).otherInformationText}>Marca: {product.Marca}</Text>
                </View>
                {
                    fromModal &&
                    <View style={[product.CodBar ? ProductItemSearchStyles(theme).codebarAvailable : ProductItemSearchStyles(theme).codebarNotAvailable]}>
                        <Text style={product.CodBar ? ProductItemSearchStyles(theme).textAvailable : ProductItemSearchStyles(theme).textNotAvailable}>
                            {product.CodBar ? "Tiene código" : "No tiene código"}
                        </Text>
                    </View>

                }
            </View>
        </TouchableOpacity>
    )
}