import React, { useContext, useState } from 'react';

import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import PorductInterface from '../../../interface/product';
import { Counter } from '../../Ui/Counter';
import { useNavigation } from '@react-navigation/native';
import { buttonStyles } from '../../../theme/UI/buttons';
import { globalStyles } from '../../../theme/appTheme';

interface ScannerResultInterface {
    product: PorductInterface;
    onClose: () => void;
}

export const ScannerResult = ({
    product,
    onClose
}: ScannerResultInterface) => {

    const { addProduct } = useContext(InventoryBagContext)
    const [counterProduct, setCounterProduct] = useState<number>(0);
    const { navigate } = useNavigation<any>();

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

    return (
        <KeyboardAvoidingView>
            {
                product ?
                    <View style={styles.ScannerResult}>
                        <View style={styles.product}>
                            <View style={styles.productText}>
                                <Image
                                    style={styles.productIcon}
                                    source={{
                                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                                    }}
                                />

                                <View style={styles.productMessage}>
                                    <Text>Codigo: </Text>
                                    <Text>{product?.CodBar}</Text>
                                    <Text>{product?.Marca}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={handleExpandProductDetails}
                            >
                                <Icon name="expand-outline" size={20} color="black" />
                            </TouchableOpacity>
                        </View>

                        <Counter counter={counterProduct} setCounter={setCounterProduct} />

                        <TouchableOpacity
                            style={[buttonStyles.button, buttonStyles.black]}
                            onPress={handleAddToInventory}
                        >
                            <Text style={buttonStyles.buttonText}>Agregar al inventario</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <Text>
                            No existe producto
                        </Text>
                    </View>
            }
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    ScannerResult:{
        paddingBottom: globalStyles.globalMarginBottom.marginBottom
    },
    product: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: globalStyles.globalMarginBottom.marginBottom
    },
    productText: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row"
    },
    productMessage: {
        marginLeft: 10
    },
    productIcon: {
        width: 50,
        height: 50,
    },
    counter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: globalStyles.globalMarginBottom.marginBottom
    },
    productNotFound: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: globalStyles.globalMarginBottom.marginBottom
    },
    productNotFoundText: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        width: "50%"
    },
    productNotFoundMessage: {
        marginLeft: 10
    },
    productNotFoundTitle: {
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom: globalStyles.globalMarginBottom.marginBottom
    }
});