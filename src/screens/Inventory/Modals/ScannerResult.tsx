import React, { useContext, useState } from 'react';

import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import ProductInterface from '../../../interface/product';
import { Counter } from '../../../components/Inputs/Counter';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../../../theme/UI/buttons';
import { globalFont, globalStyles } from '../../../theme/appTheme';
import { EmptyMessageCard } from '../../../components/Cards/EmptyMessageCard';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { modalRenderstyles } from '../../../theme/ModalRenders/ScannerResultTheme';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { useTheme } from '../../../context/ThemeContext';
import Toast from 'react-native-toast-message';
import { InventoryNavigationProp, InventoryNavigationStackParamList } from '../../../navigator/InventoryNavigation';
import CustomText from '../../../components/Ui/CustumText';

type ScannerResultRouteProp = RouteProp<InventoryNavigationStackParamList, '[Modal] - scannerResultScreen'>;

interface ScannerResultInterface {
    fromInput?: boolean;
    seeProductDetails?: boolean;
    route: ScannerResultRouteProp;
};

const ScannerResult = ({
    fromInput,
    seeProductDetails = true,
    route
}: ScannerResultInterface) => {

    const { product, fromProductDetails } = route?.params || {}
    const { theme, typeTheme } = useTheme();
    const { addProduct } = useContext(InventoryBagContext)
    const { handleCameraAvailable, codeBar } = useContext(SettingsContext);
    const navigation = useNavigation<InventoryNavigationProp>();

    const [loadingAddProduct, setLoadingAddProduct] = useState(false)
    const [counterProduct, setCounterProduct] = useState<number>(0);
    const buttondisabled = loadingAddProduct || counterProduct < 1;

    const handleAddToInventory = () => {
        setLoadingAddProduct(true)
        const inventoryBody = {
            ...product,
            cantidad: counterProduct === 0 ? 1 : counterProduct
        }

        addProduct(inventoryBody as ProductInterface);

        if(fromProductDetails) {
            Toast.show({
                type: 'tomatoToast',
                text1: 'Se agrego el producto la inventario!'
            })
        }
        handleCameraAvailable(true)
        setLoadingAddProduct(false)
        navigation.goBack()
    }

    const handleExpandProductDetails = () => {
        navigation.goBack()
        navigation.navigate('[ProductDetailsPage] - productDetailsScreen', { selectedProduct: product, fromModal: true });
    }

    const handleSearchByCode = () => {
        navigation.goBack()
        navigation.navigate('[Modal] - findByCodebarInputModal');
    }

    const handleAssignCodeToProduct = () => {
        handleCameraAvailable(false)
        setTimeout(() => {
            navigation.goBack()
            navigation.navigate('[Modal] - searchProductModal', { modal: true, isModal: false })
        }, 500);
    }

    return (
        <ModalBottom
            visible={true}
            onClose={() => navigation.goBack()}
        >
            {
                (product) ?
                    <View style={modalRenderstyles(theme).ScannerResult}>
                        <View style={modalRenderstyles(theme).product}>
                            <View>
                                <CustomText style={modalRenderstyles(theme).codeLabel}>Codigo: </CustomText>
                                <CustomText style={modalRenderstyles(theme).codeValue}>{product?.clave}</CustomText>
                                <View style={modalRenderstyles(theme).otherInfo}>
                                    {
                                        product?.codbarras ?
                                            <View style={modalRenderstyles(theme, typeTheme).codebarNotAvailable}>
                                                <CustomText style={modalRenderstyles(theme, typeTheme).textNotAvailable}>
                                                    No tiene código
                                                </CustomText>
                                            </View>
                                            :
                                            <CustomText style={{ color: theme.text_color }}>{product?.codbarras}</CustomText>
                                    }
                                    <CustomText style={{ color: theme.text_color }}>/</CustomText>
                                    <CustomText style={{ color: theme.text_color }}>{product?.familia}</CustomText>
                                </View>
                            </View>
                        </View>

                        <View style={modalRenderstyles(theme).counterContainer}>
                            <View style={{ width: "40%" }}>
                                {
                                    (seeProductDetails && !fromProductDetails) &&
                                    <TouchableOpacity
                                        onPress={handleExpandProductDetails}
                                        style={[buttonStyles(theme).button_small, buttonStyles(theme).white]}
                                    >
                                        <CustomText style={[buttonStyles(theme, typeTheme).buttonTextTertiary, { fontSize: globalFont.font_sm }]}>Ver producto</CustomText>
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={{ width: "55%" }}>
                                <Counter counter={counterProduct} setCounter={setCounterProduct} unit={product.unidad_nombre} />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[buttonStyles(theme).button, buttonStyles(theme).yellow, { display: 'flex', flexDirection: 'row' },
                            ...(buttondisabled ? [buttonStyles(theme).disabled] : [])
                            ]}
                            onPress={handleAddToInventory}
                            disabled={buttondisabled}
                        >
                            <Icon name="add-circle-outline" size={16} color={"black"} style={{ marginRight: 10 }} />
                            <CustomText style={buttonStyles(theme, typeTheme).buttonTextSecondary}>Agregar al inventario</CustomText>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <EmptyMessageCard title={fromInput ? `No existe producto con este codigo.` : `No existe producto con codigo de barras:`} message={`${codeBar}`} icon='help-circle' />

                        <TouchableOpacity
                            onPress={handleSearchByCode}
                            style={[buttonStyles(theme).button, buttonStyles(theme).white, { marginVertical: globalStyles(theme).globalMarginBottomSmall.marginBottom }]}
                        >
                            <CustomText style={buttonStyles(theme, typeTheme).buttonTextTertiary}>Buscar producto</CustomText>
                        </TouchableOpacity>

                        {
                            (codeBar && codeBar !== "") &&
                            <TouchableOpacity
                                onPress={handleAssignCodeToProduct}
                                style={[buttonStyles(theme).button, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]}
                            >
                                <CustomText style={buttonStyles(theme, typeTheme).buttonText}>Asignar a un producto</CustomText>
                            </TouchableOpacity>
                        }
                    </View>
            }
        </ModalBottom>
    )
}


export default ScannerResult;