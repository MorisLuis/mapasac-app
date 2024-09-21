import React from 'react';
import { View } from 'react-native';
import ProductInterface from '../../../interface/product';
import { ProductInventoryCard } from '../../../components/Cards/ProductInventoryCard';
import ModalMiddle from '../../../components/Modals/ModalMiddle';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context/ThemeContext';
import { InventoryNavigationProp, InventoryNavigationStackParamList } from '../../../navigator/InventoryNavigation';
import CustomText from '../../../components/Ui/CustumText';
import { ProductFindByCodebarInputStyles } from '../../../theme/ModalRenders/ProductFindByCodebarInputTheme';

type ProductsFindByCodeBarRouteProp = RouteProp<InventoryNavigationStackParamList, '[Modal] - productsFindByCodeBarModal'>;

interface ProductFindByCodeBarInterface {
    route: ProductsFindByCodeBarRouteProp
}

export const ProductsFindByCodeBar = ({ route }: ProductFindByCodeBarInterface) => {

    const { products } = route.params
    const navigation = useNavigation<InventoryNavigationProp>();
    const { theme } = useTheme();

    const onSelectProduct = (product: ProductInterface) => {
        navigation.goBack()
        navigation.navigate('[Modal] - scannerResultScreen', { product: product, fromProductDetails: false })
    }

    if (!products) return;

    return (
        <ModalMiddle
            visible={true}
            onClose={() => navigation.goBack()}
        >
            <View style={ProductFindByCodebarInputStyles(theme).ProductFindByCodeBar}>
                <CustomText style={ProductFindByCodebarInputStyles(theme).title}>Productos</CustomText>
                {
                    products.map((product) =>
                        <ProductInventoryCard
                            key={`${product.idinvearts}`}
                            product={product}
                            onClick={() => onSelectProduct(product)}
                        />
                    )
                }
            </View>
        </ModalMiddle>
    )
}
