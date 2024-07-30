import React, { useContext, useState } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import ProductInterface from '../../../interface/product';
import { Counter } from '../../../components/Ui/Counter';
import { useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../../../theme/UI/buttons';
import { globalFont, globalStyles } from '../../../theme/appTheme';
import { EmptyMessageCard } from '../../../components/Cards/EmptyMessageCard';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { modalRenderstyles } from '../../../theme/ModalRenders/ScannerResultTheme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalBottom from '../../../components/Modals/ModalBottom';
import { useTheme } from '../../../context/ThemeContext';

interface ScannerResultInterface {
    fromInput?: boolean;
    seeProductDetails?: boolean;
    route?: {
        params: {
            product: ProductInterface;
            fromProductDetails?: boolean
        };
    };
}
const ScannerResult = ({
    fromInput,
    seeProductDetails = true,
    route
}: ScannerResultInterface) => {

    const { product, fromProductDetails } = route?.params || {}
    const { theme, typeTheme } = useTheme();
    const { addProduct } = useContext(InventoryBagContext)
    const { handleCameraAvailable, codeBar } = useContext(SettingsContext);
    const navigation = useNavigation<any>();

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
            navigation.navigate('[Modal] - searchProductModal', { modal: true })
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
                                <Text style={modalRenderstyles(theme).codeLabel}>Codigo: </Text>
                                <Text style={modalRenderstyles(theme).codeValue}>{product?.clave}</Text>
                                <View style={modalRenderstyles(theme).otherInfo}>
                                    {
                                        product?.codbarras ?
                                            <View style={modalRenderstyles(theme, typeTheme).codebarNotAvailable}>
                                                <Text style={modalRenderstyles(theme, typeTheme).textNotAvailable}>
                                                    No tiene código
                                                </Text>
                                            </View>
                                            :
                                            <Text style={{ color: theme.text_color }}>{product?.codbarras}</Text>
                                    }
                                    <Text style={{ color: theme.text_color }}>/</Text>
                                    <Text style={{ color: theme.text_color }}>{product?.familia}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={modalRenderstyles(theme).counterContainer}>
                            <View style={{ width: "40%"}}>
                                {
                                    (seeProductDetails && !fromProductDetails) &&
                                    <TouchableOpacity
                                        onPress={handleExpandProductDetails}
                                        style={[buttonStyles(theme).button_small, buttonStyles(theme).white]}
                                    >
                                        <Text style={[buttonStyles(theme, typeTheme).buttonTextTertiary, { fontSize: globalFont.font_sm }]}>Ver producto</Text>
                                    </TouchableOpacity>

                                }
                            </View>
                            <View style={{ width: "55%" }}>
                                <Counter counter={counterProduct} setCounter={setCounterProduct} unit={product.unidad_nombre}/>
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
                            <Text style={buttonStyles(theme, typeTheme).buttonTextSecondary}>Agregar al inventario</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <EmptyMessageCard title={fromInput ? `No existe producto con este codigo.` : `No existe producto con codigo de barras:`} message={`${codeBar}`} icon='help-circle' />

                        <TouchableOpacity
                            onPress={handleSearchByCode}
                            style={[buttonStyles(theme).button, buttonStyles(theme).white, { marginVertical: globalStyles(theme).globalMarginBottomSmall.marginBottom }]}
                        >
                            <Text style={buttonStyles(theme, typeTheme).buttonTextTertiary}>Buscar producto</Text>
                        </TouchableOpacity>

                        {
                            (codeBar && codeBar !== "") &&
                            <TouchableOpacity
                                onPress={handleAssignCodeToProduct}
                                style={[buttonStyles(theme).button, { marginBottom: globalStyles(theme).globalMarginBottom.marginBottom }]}
                            >
                                <Text style={buttonStyles(theme, typeTheme).buttonText}>Asignar a un producto</Text>
                            </TouchableOpacity>
                        }
                    </View>
            }
        </ModalBottom>
    )
}


export default ScannerResult;