import React, { useCallback, useContext, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import ProductInterface from '../../interface/product';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductDetailsStyles } from '../../theme/ProductDetailsTheme';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import { format } from '../../utils/currency';
import { getProductDetails } from '../../services/products';
import { ProductDetailsEditSkeleton } from '../../components/Skeletons/ProductDetailsEditSkeleton';
import useErrorHandler from '../../hooks/useErrorHandler';
import { InventoryNavigationProp, InventoryNavigationStackParamList } from '../../navigator/InventoryNavigation';
import CustomText from '../../components/Ui/CustumText';

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
        <ScrollView style={ProductDetailsStyles(theme).ProductDetailsPage}>
            <TouchableOpacity style={ProductDetailsStyles(theme).editContainer} onPress={handleGoEditDescripcion}>
                <View style={ProductDetailsStyles(theme).editContainer_left}>
                    <Icon name={'reader-outline'} size={18} color={theme.text_color_light} />
                    <CustomText style={ProductDetailsStyles(theme).editContainer_label}>Descripcion</CustomText>
                </View>
                <View style={ProductDetailsStyles(theme).editContainer_right}>
                    <CustomText style={ProductDetailsStyles(theme).editContainer_text}>{productDetailsData.producto}</CustomText>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={ProductDetailsStyles(theme).editContainer} onPress={handleGoEditPrice}>
                <View style={ProductDetailsStyles(theme).editContainer_left}>
                    <Icon name={'pricetag-outline'} size={18} color={theme.text_color_light} />
                    <CustomText style={ProductDetailsStyles(theme).editContainer_label}>Precio</CustomText>
                </View>
                <View style={ProductDetailsStyles(theme).editContainer_right}>
                    <CustomText style={ProductDetailsStyles(theme).editContainer_text}>{format(productDetailsData.precio1)}</CustomText>
                </View>
            </TouchableOpacity>
        </ScrollView>
    ) : (
        <ProductDetailsEditSkeleton />
    );
};