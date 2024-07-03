import React, { useContext, useState } from 'react';

import { Button, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import PorductInterface from '../../interface/product';
import { Counter } from '../../components/Ui/Counter';
import { useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../../theme/UI/buttons';
import { globalStyles } from '../../theme/appTheme';
import { EmptyMessageCard } from '../../components/Cards/EmptyMessageCard';
import { SettingsContext } from '../../context/settings/SettingsContext';
import { modalRenderstyles } from '../../theme/ModalRenders/ScannerResultTheme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalBottom from '../../components/Modals/ModalBottom';
import { useTheme } from '../../context/ThemeContext';

interface ScannerResultInterface {
    fromInput?: boolean;
    seeProductDetails?: boolean;
    route?: {
        params: {
            product: PorductInterface;
        };
    };
}
const ScannerResult = ({
    fromInput,
    seeProductDetails = true,
    route
}: ScannerResultInterface) => {


    const { product } = route?.params || {}
    const { theme, typeTheme } = useTheme();
    const [loadingAddProduct, setLoadingAddProduct] = useState(false)

    const { addProduct } = useContext(InventoryBagContext)
    const { handleCameraAvailable, codeBar } = useContext(SettingsContext);

    const navigation = useNavigation<any>();

    const [counterProduct, setCounterProduct] = useState<number>(0);

    const handleAddToInventory = () => {
        setLoadingAddProduct(true)
        const inventoryBody = {
            ...product,
            Piezas: counterProduct === 0 ? 1 : counterProduct
        }
        addProduct(inventoryBody as any)
        handleCameraAvailable(true)
        navigation.goBack()
        setLoadingAddProduct(false)
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

    /* navigation.navigate('BottomNavigation') */
    return (
        <ModalBottom
            visible={true}
            onClose={() => navigation.goBack()}
        >
            {
                (product) ?
                    <View style={modalRenderstyles(theme).ScannerResult}>
                        <View style={modalRenderstyles(theme).product}>
                            <View style={modalRenderstyles(theme).productText}>
                                <View style={modalRenderstyles(theme).productMessage}>
                                    <Text style={modalRenderstyles(theme).codeLabel}>Codigo: </Text>
                                    <Text style={modalRenderstyles(theme).codeValue}>{product?.Codigo}</Text>
                                    <View style={modalRenderstyles(theme).otherInfo}>
                                        <Text style={{ color: theme.text_color }}>{product?.CodBar}</Text>
                                        <Text style={{ color: theme.text_color }}>/</Text>
                                        <Text style={{ color: theme.text_color }}>{product?.Marca}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={modalRenderstyles(theme).counterContainer}>
                            <View style={{ width: wp("42.5%") }}>
                                {
                                    seeProductDetails &&
                                    <TouchableOpacity
                                        onPress={handleExpandProductDetails}
                                        style={[buttonStyles(theme).button_small, buttonStyles(theme).white]}
                                    >
                                        <Text style={buttonStyles(theme, typeTheme).buttonTextTertiary}>Ver producto</Text>
                                    </TouchableOpacity>

                                }
                            </View>
                            <View style={{ width: wp("42.5%") }}>
                                <Counter counter={counterProduct} setCounter={setCounterProduct} />
                            </View>
                        </View>

                        <TouchableOpacity
                            //style={[buttonStyles(theme).button, buttonStyles(theme).yellow, { display: 'flex', flexDirection: 'row' }]}

                            style={[buttonStyles(theme).button, buttonStyles(theme).yellow, { display: 'flex', flexDirection: 'row' },
                            ...(loadingAddProduct ? [buttonStyles(theme).disabled] : [])
                            ]}
                            onPress={handleAddToInventory}
                            disabled={loadingAddProduct}
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