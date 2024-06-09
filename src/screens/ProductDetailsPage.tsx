import React, { useCallback, useContext, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getProductDetails } from '../services/products';
import ProductInterface from '../interface/product';
import { format } from '../utils/currency';
import { buttonStyles } from '../theme/UI/buttons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductDetailsSkeleton } from '../components/Skeletons/ProductDetailsSkeleton';
import { productDetailsStyles } from '../theme/productDetailsTheme';
import { SettingsContext } from '../context/settings/SettingsContext';
import { globalStyles } from '../theme/appTheme';

type ProductDetailsPageInterface = {
    route?: {
        params: {
            productDetails: ProductInterface;
            selectedProduct: { Codigo: string; Marca: string };
            fromModal?: boolean
        };
    };
};

export const ProductDetailsPage = ({ route }: ProductDetailsPageInterface) => {
    const { productDetails, selectedProduct, fromModal } = route?.params ?? {};
    const { Codigo, Marca } = selectedProduct ?? {};
    
    const { handleCameraAvailable } = useContext(SettingsContext);
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

    const handleAddToInventory = () => {
        navigation.navigate('scannerResultScreen', { product: selectedProduct });
    }

    useFocusEffect(
        useCallback(() => {
            handleCameraAvailable(false);
            handleGetProductDetails();
        }, [])
    );


    return productDetailsData ? (
        <ProductDetailsContent
            productDetailsData={productDetailsData}
            handleOptionsToUpdateCodebar={handleOptionsToUpdateCodebar}
            handleAddToInventory={handleAddToInventory}
            fromModal={fromModal}
        />
    ) : (
        <ProductDetailsSkeleton />
    );
};


const ProductDetailsContent = React.memo(({ productDetailsData, handleOptionsToUpdateCodebar, handleAddToInventory, fromModal } : any) => {
    return (
        <>
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
                        <Text style={productDetailsStyles.priceValue}>{format(productDetailsData.Precio)}</Text>
                    </View>
                </View>

                <View style={productDetailsStyles.information}>
                    <ProductDetailItem label="Codigo:" value={productDetailsData.Codigo} />
                    <ProductDetailItem label="Existencia:" value={productDetailsData.Existencia} />
                    <ProductDetailItem label="Familia:" value={productDetailsData.Familia} />
                    <ProductDetailItem label="Marca:" value={productDetailsData.Marca} />
                    {productDetailsData.CodBar && (
                        <ProductDetailItem label="Codigo de barras:" value={productDetailsData.CodBar} />
                    )}
                </View>

                {(!productDetailsData.CodBar && !fromModal) && (
                    <TouchableOpacity
                        style={[buttonStyles.button, { marginBottom: globalStyles.globalMarginBottom.marginBottom * 2 }]}
                        onPress={handleOptionsToUpdateCodebar}
                    >
                        <Text style={buttonStyles.buttonText}>Crear codigo de barras</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>

            {!fromModal && (
                <View style={productDetailsStyles.footer}>
                    <TouchableOpacity
                        style={[buttonStyles.button, buttonStyles.yellow, { display: 'flex', flexDirection: 'row', width: "100%" }]}
                        onPress={handleAddToInventory}
                    >
                        <Icon name="add-circle-outline" size={16} color="black" style={{ marginRight: 10 }} />
                        <Text style={buttonStyles.buttonTextSecondary}>Agregar a inventario</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
});

const ProductDetailItem = React.memo(({ label, value } : any ) => (
    <View style={productDetailsStyles.data}>
        <Text style={productDetailsStyles.label}>{label}</Text>
        <Text style={productDetailsStyles.dataValue}>{value}</Text>
        <View style={productDetailsStyles.separator} />
    </View>
));

