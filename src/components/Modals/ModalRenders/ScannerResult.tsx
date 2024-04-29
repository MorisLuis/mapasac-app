import React, { useContext, useState } from 'react';

import { KeyboardAvoidingView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import PorductInterface from '../../../interface/product';
import { Counter } from '../../Ui/Counter';
import { useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../../../theme/UI/buttons';
import {  globalStyles } from '../../../theme/appTheme';
import { AuthContext } from '../../../context/auth/AuthContext';
import { EmptyMessageCard } from '../../Cards/EmptyMessageCard';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { modalRenderstyles } from '../../../theme/ModalRenders/ScannerResultTheme';

interface ScannerResultInterface {
    product: PorductInterface;
    onClose: () => void;
    handleSelectFindByCode: () => void;
    fromInput: boolean;
}

export const ScannerResult = ({
    product,
    onClose,
    handleSelectFindByCode,
    fromInput
}: ScannerResultInterface) => {

    const { addProduct } = useContext(InventoryBagContext)
    const { codeBar } = useContext(AuthContext);
    const { handleCameraAvailable } = useContext(SettingsContext);

    const { navigate } = useNavigation<any>();
    const [counterProduct, setCounterProduct] = useState<number>(0);

    const handleAddToInventory = () => {

        const inventoryBody = {
            ...product,
            Piezas: counterProduct
        }

        addProduct(inventoryBody)
        onClose()
    }

    const handleExpandProductDetails = () => {
        navigate('ProductDetails', { selectedProduct: product });
    }

    const handleSearchByCode = () => {
        onClose()
        handleSelectFindByCode()
    }

    const handleAssignCodeToProduct = () => {
        onClose()
        handleCameraAvailable(false)
        setTimeout(() => {
            navigate('SearchProductModal', { modal: true })
        }, 500);
    }

    return (
        <KeyboardAvoidingView>
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

                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <TouchableOpacity
                                onPress={handleExpandProductDetails}
                                style={[buttonStyles.button, buttonStyles.white, { width: "35%", marginRight: "5%" }]}
                            >
                                <Text style={buttonStyles.buttonTextSecondary}>Ver producto</Text>
                            </TouchableOpacity>
                            <View style={{ width: "55%", marginLeft: "5%" }}>
                                <Counter counter={counterProduct} setCounter={setCounterProduct} />
                            </View>
                        </View>


                        <TouchableOpacity
                            style={[buttonStyles.button, buttonStyles.yellow, { display: 'flex', flexDirection: 'row' }]}
                            onPress={handleAddToInventory}
                        >
                            <Icon name="expand-outline" size={16} color="black" style={{ marginRight: 10 }} />
                            <Text style={buttonStyles.buttonTextSecondary}>Agregar al inventario</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <EmptyMessageCard title={fromInput ? `No existe producto con este codigo.` : `No existe producto con codigo de barras:`} message={`${codeBar}`} icon='help-circle'/>

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
        </KeyboardAvoidingView>
    )
}

