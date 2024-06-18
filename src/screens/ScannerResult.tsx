import React, { useContext, useState } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { InventoryBagContext } from '../context/Inventory/InventoryBagContext';
import PorductInterface from '../interface/product';
import { Counter } from '../components/Ui/Counter';
import { useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../theme/UI/buttons';
import { globalStyles } from '../theme/appTheme';
import { AuthContext } from '../context/auth/AuthContext';
import { EmptyMessageCard } from '../components/Cards/EmptyMessageCard';
import { SettingsContext } from '../context/settings/SettingsContext';
import { modalRenderstyles } from '../theme/ModalRenders/ScannerResultTheme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModalBottom from '../components/Modals/ModalBottom';

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

    const { addProduct } = useContext(InventoryBagContext)
    const { codeBar } = useContext(AuthContext);
    const { handleCameraAvailable } = useContext(SettingsContext);

    const navigation = useNavigation<any>();

    const [counterProduct, setCounterProduct] = useState<number>(0);

    const handleAddToInventory = () => {

        const inventoryBody = {
            ...product,
            Piezas: counterProduct === 0 ? 1 : counterProduct
        }
        handleCameraAvailable(true)
        addProduct(inventoryBody as any)
        navigation.goBack()
    }

    const handleExpandProductDetails = () => {
        navigation.goBack()
        navigation.navigate('productDetailsScreen', { selectedProduct: product, fromModal: true });
    }

    const handleSearchByCode = () => {
        navigation.navigate('findByCodebarInputModal');
    }

    const handleAssignCodeToProduct = () => {
        handleCameraAvailable(false)
        setTimeout(() => {
            navigation.navigate('searchProductModal', { modal: true })
        }, 500);
    }

    return (
        <ModalBottom
            visible={true}
            onClose={() => {
                handleCameraAvailable(true)
                navigation.goBack()
            }}
        >
            {
                product ?
                    <View style={modalRenderstyles.ScannerResult}>
                        <View style={modalRenderstyles.product}>
                            <View style={modalRenderstyles.productText}>
                                <View style={modalRenderstyles.productMessage}>
                                    <Text style={modalRenderstyles.codeLabel}>Codigo: </Text>
                                    <Text style={modalRenderstyles.codeValue}>{product?.Codigo}</Text>
                                    <View style={modalRenderstyles.otherInfo}>
                                        <Text>{product?.CodBar}</Text>
                                        <Text>/</Text>
                                        <Text>{product?.Marca}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={modalRenderstyles.counterContainer}>
                            <View style={{ width: wp("42.5%") }}>
                                {
                                    seeProductDetails &&
                                    <TouchableOpacity
                                        onPress={handleExpandProductDetails}
                                        style={[buttonStyles.button_small, buttonStyles.white]}
                                    >
                                        <Text style={modalRenderstyles.seeProduct}>Ver producto</Text>
                                    </TouchableOpacity>

                                }
                            </View>
                            <View style={{ width: wp("42.5%") }}>
                                <Counter counter={counterProduct} setCounter={setCounterProduct} />
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[buttonStyles.button, buttonStyles.yellow, { display: 'flex', flexDirection: 'row' }]}
                            onPress={handleAddToInventory}
                        >
                            <Icon name="add-circle-outline" size={16} color="black" style={{ marginRight: 10 }} />
                            <Text style={buttonStyles.buttonTextSecondary}>Agregar al inventario</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <EmptyMessageCard title={fromInput ? `No existe producto con este codigo.` : `No existe producto con codigo de barras:`} message={`${codeBar}`} icon='help-circle' />

                        <TouchableOpacity
                            onPress={handleSearchByCode}
                            style={[buttonStyles.button, buttonStyles.white, { marginVertical: globalStyles.globalMarginBottomSmall.marginBottom }]}
                        >
                            <Text style={buttonStyles.buttonTextSecondary}>Buscar producto</Text>
                        </TouchableOpacity>

                        {
                            (codeBar && codeBar !== "") &&
                            <TouchableOpacity
                                onPress={handleAssignCodeToProduct}
                                style={[buttonStyles.button, { marginBottom: globalStyles.globalMarginBottom.marginBottom }]}
                            >
                                <Text style={buttonStyles.buttonText}>Asignar a un producto</Text>
                            </TouchableOpacity>
                        }
                    </View>
            }
        </ModalBottom>
    )
}


export default ScannerResult;