import React, { useCallback, useContext, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { getProductDetails } from '../../services/products';
import ProductInterface from '../../interface/product';
import { buttonStyles } from '../../theme/UI/buttons';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProductDetailsSkeleton } from '../../components/Skeletons/ProductDetailsSkeleton';
import { ProductDetailsStyles } from '../../theme/ProductDetailsTheme';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { globalStyles } from '../../theme/appTheme';
import { identifyBarcodeType } from '../../utils/identifyBarcodeType';
import { useTheme } from '../../context/ThemeContext';
import { format } from '../../utils/currency';
import { MessageCard } from '../../components/Cards/MessageCard';
import useErrorHandler from '../../hooks/useErrorHandler';
import { InventoryNavigationProp, InventoryNavigationStackParamList } from '../../navigator/InventoryNavigation';
import CustomText from '../../components/Ui/CustumText';

type ProductDetailsPageRouteProp = RouteProp<InventoryNavigationStackParamList, '[ProductDetailsPage] - productDetailsScreen'>;
type InventoryDetailsScreenPageRouteProp = RouteProp<InventoryNavigationStackParamList, '[ProductDetailsPage] - inventoryDetailsScreen'>;

type ProductDetailsPageInterface = {
    route: ProductDetailsPageRouteProp | InventoryDetailsScreenPageRouteProp
};

export const ProductDetailsPage = ({ route }: ProductDetailsPageInterface) => {

    const { selectedProduct, fromModal } = route.params;
    const { idinvearts } = selectedProduct;
    const { handleCameraAvailable, codeBar } = useContext(SettingsContext);
    const shouldCleanUp = useRef(true);
    const { handleError } = useErrorHandler()

    const navigation = useNavigation<InventoryNavigationProp>();
    const [productDetailsData, setProductDetailsData] = useState<ProductInterface>();

    const handleOptionsToUpdateCodebar = () => {
        navigation.navigate('CodebarUpdateNavigation', { selectedProduct: { idinvearts: selectedProduct.idinvearts } });
    };

    const handleEditProduct = () => {
        if (!productDetailsData) return;
        navigation.navigate("[ProductDetailsPage] - productDetailsScreenEdit", { product: { idinvearts: productDetailsData?.idinvearts } })
    }

    const handleGetProductDetails = async () => {
        try {
            const productData = await getProductDetails(idinvearts);
            if (productData.error) return handleError(productData.error);
            setProductDetailsData(productData);
        } catch (error) {
            handleError(error)
        };
    };

    const handleAddToInventory = () => {
        if (!productDetailsData) return;
        shouldCleanUp.current = false;
        navigation.navigate('[Modal] - scannerResultScreen', { product: productDetailsData, fromProductDetails: true });
    }

    useFocusEffect(
        useCallback(() => {
            handleCameraAvailable(false);
            handleGetProductDetails();

            return () => {
                if (shouldCleanUp.current) {
                    setProductDetailsData(undefined);
                }

                /* if (fromUpdateCodebar) {
                    shouldCleanUp.current = true;
                } */
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
        //fromUpdateCodebar={fromUpdateCodebar}
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
            <ScrollView style={ProductDetailsStyles(theme).ProductDetailsPage}>
                <View style={ProductDetailsStyles(theme, typeTheme).imageContainer}>
                    <View style={ProductDetailsStyles(theme).notImage}>
                        <View style={ProductDetailsStyles(theme).notImageBackground}>
                            <Icon name={'image-outline'} size={24} color={iconColor} />
                        </View>
                    </View>
                </View>
                <View style={ProductDetailsStyles(theme).header}>
                    <CustomText style={ProductDetailsStyles(theme).description}>{productDetailsData.producto}</CustomText>
                    <View>
                        <CustomText style={ProductDetailsStyles(theme, typeTheme).price}>Precio</CustomText>
                        <CustomText style={ProductDetailsStyles(theme, typeTheme).priceValue}>{format(productDetailsData.precio1)}</CustomText>
                    </View>
                </View>

                <View style={ProductDetailsStyles(theme, typeTheme).information}>
                    <ProductDetailItem theme={theme} label="Clave:" value={productDetailsData.clave} />
                    <ProductDetailItem theme={theme} label="Familia:" value={productDetailsData.familia || ""} />
                    <ProductDetailItem theme={theme} label="No. Artiuclo:" value={productDetailsData.noarticulo || ""} />

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
                    <View style={ProductDetailsStyles(theme, typeTheme).manageEvents}>
                        <CustomText style={ProductDetailsStyles(theme, typeTheme).manageEvents_title}>Manejar producto</CustomText>
                        <View style={ProductDetailsStyles(theme, typeTheme).manageEvents_content}>
                            {(!codebarAvailable) &&
                                <TouchableOpacity
                                    style={ProductDetailsStyles(theme, typeTheme).event}
                                    onPress={handleOptionsToUpdateCodebar}
                                >
                                    <View style={ProductDetailsStyles(theme, typeTheme).event_icon}>
                                        <Icon name={'barcode-outline'} size={20} color={iconColor} />
                                    </View>
                                    <CustomText style={ProductDetailsStyles(theme, typeTheme).event_text}>Crear codigo</CustomText>
                                </TouchableOpacity>
                            }


                            <TouchableOpacity
                                style={[ProductDetailsStyles(theme, typeTheme).event, codebarAvailable && { flex: 0.33 }]}
                                onPress={handleEditProduct}
                            >
                                <View style={ProductDetailsStyles(theme, typeTheme).event_icon}>
                                    <Icon name={'create-outline'} size={20} color={iconColor} />
                                </View>
                                <CustomText style={ProductDetailsStyles(theme, typeTheme).event_text}>Editar</CustomText>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </ScrollView>

            {!fromModal && (
                <View style={ProductDetailsStyles(theme, typeTheme).footer}>
                    <TouchableOpacity
                        style={[buttonStyles(theme, typeTheme).button, buttonStyles(theme, typeTheme).yellow, { display: 'flex', flexDirection: 'row', width: "100%" }]}
                        onPress={handleAddToInventory}
                    >
                        <Icon name="add-circle-outline" size={16} color={"black"} style={{ marginRight: 10 }} />
                        <CustomText style={buttonStyles(theme, typeTheme).buttonTextSecondary}>Agregar a inventario</CustomText>
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

    <View style={ProductDetailsStyles(theme).data}>
        <CustomText style={ProductDetailsStyles(theme).label}>{label}</CustomText>
        <CustomText style={ProductDetailsStyles(theme).dataValue}>{value}</CustomText>
        {
            !isLastChild &&
            <View style={ProductDetailsStyles(theme).separator} />
        }
    </View>
));

