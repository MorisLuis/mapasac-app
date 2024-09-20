import React, { useCallback, useContext, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ProductInterface from '../../interface/product';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { productDetailsStyles } from '../../theme/productDetailsTheme';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import { format } from '../../utils/currency';
import { getProductDetails } from '../../services/products';
import { ProductDetailsEditSkeleton } from '../../components/Skeletons/ProductDetailsEditSkeleton';
import useErrorHandler from '../../hooks/useErrorHandler';
import { InventoryNavigationProp, InventoryNavigationStackParamList } from '../../navigator/InventoryNavigation';

type EditProductPageRouteProp = RouteProp<InventoryNavigationStackParamList, '[ProductDetailsPage] - productDetailsScreenEdit'>;

type ProductDetailsPageEditInterface = {
    route: EditProductPageRouteProp;
};

export const ProductDetailsPageEdit = ({ route }: ProductDetailsPageEditInterface) => {
    const { product } = route.params;
    const { handleCameraAvailable } = useContext(SettingsContext);
    const { theme } = useTheme();
    const { handleError } = useErrorHandler()
    const navigation = useNavigation<InventoryNavigationProp>();

    const [productDetailsData, setProductDetailsData] = useState<ProductInterface>();

    const handleGoEditDescripcion = () => {
        if(!productDetailsData) return;
        navigation.navigate("[ProductDetailsPage] - editDescripcio", { product: productDetailsData })
    }

    const handleGoEditPrice = () => {
        if(!productDetailsData) return;
        navigation.navigate('[ProductDetailsPage] - editPrice', { product: productDetailsData });
    };

    const handleGetProductDetails = async () => {

        try {
            const productData = await getProductDetails(product.idinvearts);
            if (productData.error) return  handleError(productData.error);
            setProductDetailsData(productData);
        } catch (error) {
            handleError(error)
        }
    };

    useFocusEffect(
        useCallback(() => {
            handleCameraAvailable(false);
            handleGetProductDetails();
        }, [product.idinvearts])
    );

    return productDetailsData ? (
        <ScrollView style={productDetailsStyles(theme).ProductDetailsPage}>
            <TouchableOpacity style={productDetailsStyles(theme).editContainer} onPress={handleGoEditDescripcion}>
                <View style={productDetailsStyles(theme).editContainer_left}>
                    <Icon name={'reader-outline'} size={18} color={theme.text_color_light} />
                    <Text style={productDetailsStyles(theme).editContainer_label}>Descripcion</Text>
                </View>
                <View style={productDetailsStyles(theme).editContainer_right}>
                    <Text style={productDetailsStyles(theme).editContainer_text}>{productDetailsData.producto}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={productDetailsStyles(theme).editContainer} onPress={handleGoEditPrice}>
                <View style={productDetailsStyles(theme).editContainer_left}>
                    <Icon name={'pricetag-outline'} size={18} color={theme.text_color_light} />
                    <Text style={productDetailsStyles(theme).editContainer_label}>Precio</Text>
                </View>
                <View style={productDetailsStyles(theme).editContainer_right}>
                    <Text style={productDetailsStyles(theme).editContainer_text}>{format(productDetailsData.precio1)}</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    ) : (
        <ProductDetailsEditSkeleton />
    );
};