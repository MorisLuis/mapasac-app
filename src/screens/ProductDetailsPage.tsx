import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getProductDetails } from '../services/products';
import ProductInterface from '../interface/product';
import { format } from '../utils/currency';
import { buttonStyles } from '../theme/UI/buttons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductDetailsSkeleton } from '../components/Skeletons/ProductDetailsSkeleton';
import { productDetailsStyles } from '../theme/productDetailsTheme';

type ProductDetailsPageInterface = {
    route?: {
        params: {
            productDetails: ProductInterface;
            selectedProduct: { Codigo: string; Marca: string };
        };
    };
};

export const ProductDetailsPage = ({ route }: ProductDetailsPageInterface) => {
    const { productDetails, selectedProduct } = route?.params ?? {};
    const { Codigo, Marca } = selectedProduct ?? {};


    const navigation = useNavigation<any>();
    const [productDetailsData, setProductDetailsData] = useState<ProductInterface | null>(null);

    const handleOptionsToUpdateCodebar = () => {
        navigation.navigate('CodebarUpdateNavigation', { productDetails, selectedProduct });
    };

    const handleGetProductDetails = async () => {
        try {
            const productData = await getProductDetails(Codigo as string, Marca as string);
            setProductDetailsData(productData);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            handleGetProductDetails();
        }, [])
    );

    return productDetailsData ? (
        <ScrollView style={productDetailsStyles.ProductDetailsPage}>
            <View style={productDetailsStyles.imageContainer}>
                {productDetailsData.imagen ? (
                    <Image
                        style={productDetailsStyles.image}
                        source={{
                            uri: productDetailsData.imagen[0]?.url
                        }}
                    />
                ) : (
                    <View style={productDetailsStyles.notImage}>
                        <Icon name={'camera'} size={24} color="black" />
                        <Text style={productDetailsStyles.notImageText} numberOfLines={2}>OLEI SOFTWARE</Text>
                    </View>
                )}
            </View>
            <View style={productDetailsStyles.header}>
                <Text style={productDetailsStyles.description}>{productDetailsData.Descripcion}</Text>
                <View>
                    <Text style={productDetailsStyles.price}>Precio</Text>
                    <Text>{format(productDetailsData.Precio)}</Text>
                </View>
            </View>

            <View style={productDetailsStyles.information}>
                <View style={productDetailsStyles.data}>
                    <Text style={productDetailsStyles.label}>Codigo:</Text>
                    <Text>{productDetailsData.Codigo}</Text>
                    <View style={productDetailsStyles.separator} />
                </View>

                <View style={productDetailsStyles.data}>
                    <Text style={productDetailsStyles.label}>Existencia:</Text>
                    <Text>{productDetailsData.Existencia}</Text>
                    <View style={productDetailsStyles.separator} />
                </View>

                <View style={productDetailsStyles.data}>
                    <Text style={productDetailsStyles.label}>Familia:</Text>
                    <Text>{productDetailsData.Familia}</Text>
                    <View style={productDetailsStyles.separator} />
                </View>

                <View style={productDetailsStyles.data}>
                    <Text style={productDetailsStyles.label}>Marca:</Text>
                    <Text>{productDetailsData.Marca}</Text>
                    {productDetailsData.CodBar && <View style={productDetailsStyles.separator} />}
                </View>
                {productDetailsData.CodBar && (
                    <View style={productDetailsStyles.data}>
                        <Text style={productDetailsStyles.label}>Codigo de barras: </Text>
                        <Text>{productDetailsData.CodBar}</Text>
                    </View>
                )}
            </View>

            {!productDetailsData.CodBar && (
                <TouchableOpacity style={buttonStyles.button} onPress={handleOptionsToUpdateCodebar}>
                    <Text style={buttonStyles.buttonText}>Crear codigo de barras</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    ) : (
        <ProductDetailsSkeleton />
    );
};
