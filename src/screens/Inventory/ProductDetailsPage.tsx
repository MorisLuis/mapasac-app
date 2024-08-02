import React, { useCallback, useContext, useRef, useState } from 'react';
import { Button, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getProductDetails } from '../../services/products';
import ProductInterface from '../../interface/product';
import { buttonStyles } from '../../theme/UI/buttons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductDetailsSkeleton } from '../../components/Skeletons/ProductDetailsSkeleton';
import { productDetailsStyles } from '../../theme/productDetailsTheme';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { globalStyles } from '../../theme/appTheme';
import { identifyBarcodeType } from '../../utils/identifyBarcodeType';
import { useTheme } from '../../context/ThemeContext';
import { format } from '../../utils/currency';
import { MessageCard } from '../../components/Cards/MessageCard';

type ProductDetailsPageInterface = {
    route?: {
        params: {
            selectedProduct: { idinvearts: number };
            fromModal?: boolean;
            fromUpdateCodebar: boolean
        };
    };
};

export const ProductDetailsPage = ({ route }: ProductDetailsPageInterface) => {
    const { selectedProduct, fromModal, fromUpdateCodebar } = route?.params ?? {};
    const { idinvearts } = selectedProduct ?? {};
    const { handleCameraAvailable, codeBar } = useContext(SettingsContext);
    const shouldCleanUp = useRef(true);

    const navigation = useNavigation<any>();
    const [productDetailsData, setProductDetailsData] = useState<ProductInterface | null>(null);

    const handleOptionsToUpdateCodebar = () => {
        navigation.navigate('CodebarUpdateNavigation', { selectedProduct });
    };

    const handleEditProduct = () => {
        navigation.navigate("[ProductDetailsPage] - productDetailsScreenEdit", { product: productDetailsData })
    }


    const handleGetProductDetails = async () => {
        if (!idinvearts) return;
        try {
            const productData = await getProductDetails(idinvearts);
            setProductDetailsData(productData);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleAddToInventory = () => {
        shouldCleanUp.current = false;
        navigation.navigate('[Modal] - scannerResultScreen', { product: productDetailsData, fromProductDetails: true });
    }

    useFocusEffect(
        useCallback(() => {
            handleCameraAvailable(false);
            handleGetProductDetails();

            return () => {
                if (shouldCleanUp.current) {
                    setProductDetailsData(null);
                }

                if (fromUpdateCodebar) {
                    shouldCleanUp.current = true;
                }
            };
        }, [selectedProduct])
    );

    return productDetailsData ? (
        <ProductDetailsContent
            productDetailsData={productDetailsData}
            handleOptionsToUpdateCodebar={handleOptionsToUpdateCodebar}
            handleAddToInventory={handleAddToInventory}
            handleEditProduct={handleEditProduct}
            fromModal={fromModal}
            codeBar={codeBar}
            fromUpdateCodebar={fromUpdateCodebar}
        />
    ) : (
        <ProductDetailsSkeleton />
    );
};


interface ProductDetailsContentInterface {
    productDetailsData: ProductInterface,
    handleOptionsToUpdateCodebar: any,
    handleAddToInventory: any,
    handleEditProduct: () => void;

    fromModal?: boolean,
    codeBar?: string,
    fromUpdateCodebar?: boolean
}

const ProductDetailsContent = React.memo(({ productDetailsData, handleOptionsToUpdateCodebar, handleAddToInventory, handleEditProduct, fromModal, codeBar, fromUpdateCodebar }: ProductDetailsContentInterface) => {
    const { theme, typeTheme, toggleTheme } = useTheme();
    const iconColor = typeTheme === 'dark' ? "white" : "black";
    const codebarAvailable = productDetailsData?.codbarras?.trim() !== "";

    return (
        <>
            <ScrollView style={productDetailsStyles(theme).ProductDetailsPage}>
                <View style={productDetailsStyles(theme, typeTheme).imageContainer}>
                    {/* {productDetailsData.imagen ? (
                        <Image
                            style={productDetailsStyles(theme).image}
                            source={{
                                uri: productDetailsData.imagen[0]?.url
                            }}
                        />
                    ) : (
                        <View style={productDetailsStyles(theme).notImage}>
                            <Icon name={'camera'} size={24} color={iconColor} />
                            <Text style={productDetailsStyles(theme).notImageText} numberOfLines={2}>OLEI SOFTWARE</Text>
                        </View>
                    )} */}
                    <View style={productDetailsStyles(theme).notImage}>
                        <View style={productDetailsStyles(theme).notImageBackground}>
                            <Icon name={'image-outline'} size={24} color={iconColor} />
                        </View>
                    </View>
                </View>
                <View style={productDetailsStyles(theme).header}>
                    <Text style={productDetailsStyles(theme).description}>{productDetailsData.producto}</Text>
                    <View>
                        <Text style={productDetailsStyles(theme, typeTheme).price}>Precio</Text>
                        <Text style={productDetailsStyles(theme, typeTheme).priceValue}>{format(productDetailsData.precio1)}</Text>
                    </View>
                </View>

                <View style={productDetailsStyles(theme, typeTheme).information}>
                    <ProductDetailItem theme={theme} label="Clave:" value={productDetailsData.clave} />
                    <ProductDetailItem theme={theme} label="Familia:" value={productDetailsData.familia || ""} />
                    <ProductDetailItem theme={theme} label="Unidad:" value={productDetailsData.unidad_nombre || ""} isLastChild={!codebarAvailable} />
                    {codebarAvailable && (
                        <ProductDetailItem theme={theme} label="Codigo de barras:" value={productDetailsData.codbarras} isLastChild />
                    )}
                </View>

                {
                    (codeBar && fromUpdateCodebar) &&
                    <MessageCard
                        title='El tipo de codigo de barras es:'
                        message={`${identifyBarcodeType(codeBar as string)}`}
                        icon="barcode-outline"
                        extraStyles={{ marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom }}
                    />
                }


                {
                    !fromModal &&
                    <View style={productDetailsStyles(theme, typeTheme).manageEvents}>
                        <Text style={productDetailsStyles(theme, typeTheme).manageEvents_title}>Manejar producto</Text>
                        <View style={productDetailsStyles(theme, typeTheme).manageEvents_content}>
                            {(!codebarAvailable) &&
                                <TouchableOpacity
                                    style={productDetailsStyles(theme, typeTheme).event}
                                    onPress={handleOptionsToUpdateCodebar}
                                >
                                    <View style={productDetailsStyles(theme, typeTheme).event_icon}>
                                        <Icon name={'barcode-outline'} size={20} color={iconColor} />
                                    </View>
                                    <Text style={productDetailsStyles(theme, typeTheme).event_text}>Crear codigo</Text>
                                </TouchableOpacity>
                            }


                            <TouchableOpacity
                                style={[productDetailsStyles(theme, typeTheme).event, codebarAvailable && { flex: 0.33 }]}
                                onPress={handleEditProduct}
                            >
                                <View style={productDetailsStyles(theme, typeTheme).event_icon}>
                                    <Icon name={'create-outline'} size={20} color={iconColor} />
                                </View>
                                <Text style={productDetailsStyles(theme, typeTheme).event_text}>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                {/* {
                    (
                        !productDetailsData?.codbarras || productDetailsData?.codbarras?.trim() === "" && !fromModal) && (
                        <TouchableOpacity
                            style={[buttonStyles(theme, typeTheme).button, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom * 2 }]}
                            onPress={handleOptionsToUpdateCodebar}
                        >
                            <Text style={buttonStyles(theme, typeTheme).buttonText}>Crear codigo de barras</Text>
                        </TouchableOpacity>
                    )
                } */}


            </ScrollView>

            {!fromModal && (
                <View style={productDetailsStyles(theme, typeTheme).footer}>
                    <TouchableOpacity
                        style={[buttonStyles(theme, typeTheme).button, buttonStyles(theme, typeTheme).yellow, { display: 'flex', flexDirection: 'row', width: "100%" }]}
                        onPress={handleAddToInventory}
                    >
                        <Icon name="add-circle-outline" size={16} color={"black"} style={{ marginRight: 10 }} />
                        <Text style={buttonStyles(theme, typeTheme).buttonTextSecondary}>Agregar a inventario</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
});


interface ProductDetailItem {
    label: string,
    value: string | number,
    theme: any,
    isLastChild?: boolean
}

const ProductDetailItem = React.memo(({ label, value, theme, isLastChild = false }: ProductDetailItem) => (

    <View style={productDetailsStyles(theme).data}>
        <Text style={productDetailsStyles(theme).label}>{label}</Text>
        <Text style={productDetailsStyles(theme).dataValue}>{value}</Text>
        {
            !isLastChild &&
            <View style={productDetailsStyles(theme).separator} />
        }
    </View>
));

