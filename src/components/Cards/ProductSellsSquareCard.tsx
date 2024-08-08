import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { ProductSellsInterface } from '../../interface/productSells';
import { ProductSellsCardTheme } from '../../theme/UI/cardsStyles';
import { useNavigation } from '@react-navigation/native';

interface ProductSellsCardInterface {
    product: ProductSellsInterface;
}

export const ProductSellsSquareCard = ({
    product,
}: ProductSellsCardInterface) => {

    const { theme, typeTheme } = useTheme();
    const navigation = useNavigation<any>();

    const handleSelectProduct = async () => {
        navigation.navigate('SellsDataScreen',
            {
                cvefamilia: product.cvefamilia,
                descripcio: product.descripcio,
                idinvearts: product.ridinvearts,
                image: product.imagen
            }
        );
        //navigation.navigate('[Modal] - ClassScreen')
    }

    return (
        <TouchableOpacity
            onPress={handleSelectProduct}
            style={ProductSellsCardTheme(theme, typeTheme).ProductSellsCardTheme}
        >
            <View style={ProductSellsCardTheme(theme, typeTheme).shadowImage}>
            </View>

            {
                product.imagen ? (
                    <Image source={{ uri: `data:image/png;base64,${product.imagen}` }} style={ProductSellsCardTheme(theme, typeTheme).image} />
                )
                    :
                    <View style={ProductSellsCardTheme(theme, typeTheme).notImage}></View>
            }

            <Text style={ProductSellsCardTheme(theme, typeTheme).title}>{product.descripcio}</Text>
        </TouchableOpacity>
    )
}
