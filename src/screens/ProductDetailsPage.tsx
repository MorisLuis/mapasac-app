import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getProductDetails } from '../services/products';
import PorductInterface from '../interface/product';
import { LoadingScreen } from './LoadingScreen';
import { productDetailsStyles } from '../theme/productDetailsTheme';
import { format } from '../utils/currency';
import { buttonStyles } from '../theme/UI/buttons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductDetailsSkeleton } from '../components/Skeletons/ProductDetailsSkeleton';

export const ProductDetailsPage = ({ route }: any) => {

    const imageDefault = 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2762&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    const { selectedProduct: { Codigo, Marca } } = route.params;
    const navigation = useNavigation<any>();
    const [productDetails, setProductDetails] = useState<PorductInterface>();

    const handleOptionsToUpdateCodebar = () => {
        navigation.navigate('CodebarUpdateNavigation', { productDetails, selectedProduct: { Codigo, Marca } })
    }

    const handleGetProductDetails = async () => {
        const productData = await getProductDetails(Codigo, Marca);
        setProductDetails(productData)
    }

    useFocusEffect(
        React.useCallback(() => {
            handleGetProductDetails();
        }, [])
    );

    return productDetails ?
        <>
            <ScrollView style={productDetailsStyles.ProductDetailsPage}>
                <View style={productDetailsStyles.imageContainer}>
                    {
                        productDetails?.imagen ?
                            <Image
                                style={productDetailsStyles.image}
                                source={{
                                    uri: productDetails?.imagen ? productDetails?.imagen[0]?.url : imageDefault,
                                }}
                            />
                            :
                            <View style={productDetailsStyles.notImage}>
                                <Icon name={'camera'} size={24} color="black" /* style={styles.icon}  */ />
                                <Text style={productDetailsStyles.notImageText} numberOfLines={2}>OLEI SOFTWARE</Text>
                            </View>
                    }
                </View>
                <View style={productDetailsStyles.header}>
                    <Text style={productDetailsStyles.description}>{productDetails?.Descripcion}</Text>
                    <View>
                        <Text style={productDetailsStyles.price}>Precio</Text>
                        <Text>{format(productDetails?.Precio)}</Text>
                    </View>
                </View>

                <View style={productDetailsStyles.information}>
                    <View style={productDetailsStyles.data}>
                        <Text style={productDetailsStyles.label}>Codigo:</Text>
                        <Text>{productDetails?.Codigo}</Text>
                        <View style={productDetailsStyles.separator} />
                    </View>

                    <View style={productDetailsStyles.data}>
                        <Text style={productDetailsStyles.label}>Existencia:</Text>
                        <Text>{productDetails?.Existencia}</Text>
                        <View style={productDetailsStyles.separator} />
                    </View>

                    <View style={productDetailsStyles.data}>
                        <Text style={productDetailsStyles.label}>Familia:</Text>
                        <Text>{productDetails?.Familia}</Text>
                        <View style={productDetailsStyles.separator} />
                    </View>

                    <View style={productDetailsStyles.data}>
                        <Text style={productDetailsStyles.label}>Marca:</Text>
                        <Text>{productDetails?.Marca}</Text>
                        {
                            productDetails?.CodBar &&
                            <View style={productDetailsStyles.separator} />
                        }
                    </View>
                    {
                        productDetails?.CodBar &&
                        <View style={productDetailsStyles.data}>
                            <Text style={productDetailsStyles.label}>Codigo de barras: </Text>
                            <Text>{productDetails?.CodBar}</Text>
                        </View>
                    }
                </View>

                {
                    !productDetails?.CodBar &&
                    <>
                        <TouchableOpacity style={buttonStyles.button} onPress={handleOptionsToUpdateCodebar}>
                            <Text style={buttonStyles.buttonText}>Crear codigo de barras</Text>
                        </TouchableOpacity>
                    </>
                }
            </ScrollView>
        </>
        :
        <ProductDetailsSkeleton/>
}