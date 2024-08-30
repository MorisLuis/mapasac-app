import React, { useCallback, useContext, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ProductInterface from '../../interface/product';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { productDetailsStyles } from '../../theme/productDetailsTheme';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { useTheme } from '../../context/ThemeContext';
import { format } from '../../utils/currency';
import { getProductDetails } from '../../services/products';
import { ProductDetailsEditSkeleton } from '../../components/Skeletons/ProductDetailsEditSkeleton';

type ProductDetailsPageEditInterface = {
    route?: {
        params: {
            product: { idinvearts: number };
        };
    };
};

export const ProductDetailsPageEdit = ({ route }: ProductDetailsPageEditInterface) => {
    const { product } = route?.params ?? {};
    const { handleCameraAvailable } = useContext(SettingsContext);
    const { theme } = useTheme();

    const navigation = useNavigation<any>();
    const [productDetailsData, setProductDetailsData] = useState<ProductInterface | null>(null);
    const codebarAvailable = productDetailsData?.codbarras?.trim() !== "";

    const handleGoEditDescripcion = () => {
        navigation.navigate("[ProductDetailsPage] - editDescripcio", { product: productDetailsData })
    }

    const handleGoEditPrice = () => {
        navigation.navigate('[ProductDetailsPage] - editPrice', { product: productDetailsData });
    };

    const handleGetProductDetails = async () => {
        if (!product?.idinvearts) return;
        try {
            const productData = await getProductDetails(product.idinvearts);
            setProductDetailsData(productData);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            handleCameraAvailable(false);
            handleGetProductDetails();
        }, [product?.idinvearts])
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

            {/* {
                codebarAvailable &&
                <TouchableOpacity style={productDetailsStyles(theme).editContainer}>
                    <View style={productDetailsStyles(theme).editContainer_left}>
                        <Icon name={'barcode-outline'} size={18} color={theme.text_color_light} />
                        <Text style={productDetailsStyles(theme).editContainer_label}>Codigo</Text>
                    </View>
                    <View style={productDetailsStyles(theme).editContainer_right}>
                        <Text style={productDetailsStyles(theme).editContainer_text}>{productDetailsData.codbarras.trim()}</Text>
                    </View>
                </TouchableOpacity>
            } */}
        </ScrollView>
    ) : (
        <ProductDetailsEditSkeleton />
    );
};