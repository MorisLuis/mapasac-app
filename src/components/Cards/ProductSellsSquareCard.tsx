import React, { useContext } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { ProductSellsInterface } from '../../interface/productSells';
import { ProductSellsCardTheme } from '../../theme/UI/cardsStyles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../Ui/CustumText';
import { SellsNavigationProp } from '../../navigator/SellsNavigation';
import { SellsBagContext } from '../../context/Sells/SellsBagContext';

interface ProductSellsCardInterface {
    product: ProductSellsInterface;
}

export const ProductSellsSquareCard = ({
    product,
}: ProductSellsCardInterface) => {

    const { theme, typeTheme } = useTheme();
    const { updateFormData } = useContext(SellsBagContext);
    const navigation = useNavigation<SellsNavigationProp>();
    const iconColor = typeTheme === 'dark' ? "white" : "gray"

    const handleSelectProduct = async () => {
        const count = parseInt(product.classcount ?? "0");
        updateFormData({
            cvefamilia: product.cvefamilia,
            descripcio: product.descripcio,
            image: product.imagen,
            totalClasses: parseInt(product.classcount as string),
            //idinvearts: product.ridinvearts
        });

        if (count <= 1) {
            navigation.navigate('SellsDataScreen');
        } else {
            navigation.navigate('[Modal] - ClassScreen',
                {
                    cvefamilia: product.cvefamilia,
                    descripcio: product.descripcio,
                    image: product.imagen,
                    totalClasses: parseInt(product.classcount as string)
                }
            );
        }
    }

    return (
        <TouchableOpacity
            onPress={handleSelectProduct}
            style={ProductSellsCardTheme(theme, typeTheme).ProductSellsCardTheme}
        >
            {
                product.imagen ? (
                    <View style={ProductSellsCardTheme(theme, typeTheme).item}>
                        <View style={ProductSellsCardTheme(theme, typeTheme).imageContainer}>
                            <Image
                                source={{ uri: `data:image/png;base64,${product.imagen}` }}
                                style={ProductSellsCardTheme(theme, typeTheme).image}
                            />
                        </View>
                        <CustomText style={ProductSellsCardTheme(theme, typeTheme).title}>{product.descripcio}</CustomText>
                    </View>
                )
                    :
                    <View style={ProductSellsCardTheme(theme, typeTheme).item}>
                        <View style={ProductSellsCardTheme(theme).notImage}>
                            <View style={ProductSellsCardTheme(theme).notImageBackground}>
                                <Icon name={'image-outline'} size={24} color={iconColor} />
                            </View>
                        </View>
                        <CustomText style={ProductSellsCardTheme(theme, typeTheme).title}>{product.descripcio}</CustomText>
                    </View>
            }
        </TouchableOpacity>
    )
}
