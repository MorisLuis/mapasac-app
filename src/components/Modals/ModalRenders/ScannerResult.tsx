import React, { useContext, useState } from 'react';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { InventoryBagContext } from '../../../context/Inventory/InventoryBagContext';
import PorductInterface from '../../../interface/product';
import { Counter } from '../../Ui/Counter';

interface ScannerResultInterface {
    scannedCodes?: string;
    onClose: () => void;
}

export const ScannerResult = ({
    scannedCodes,
    onClose
}: ScannerResultInterface) => {

    const { addProduct } = useContext(InventoryBagContext)
    const [counterProduct, setCounterProduct] = useState<number>(0);

    const handleAddToInventory = () => {

        const inventoryBody = {
            ...fakeProduct,
            Piezas: counterProduct
        }

        addProduct(inventoryBody)
        onClose()
    }


    return (
        <View>
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
                        <Text>{scannedCodes}</Text>
                    </View>
                </View>

                <Icon name="expand-outline" size={20} color="black" />
            </View>

            <Counter counter={counterProduct} setCounter={setCounterProduct}/>

            <TouchableOpacity
                style={styles.toogleButton}
                onPress={handleAddToInventory}
            >
                <Text style={styles.buttonText}>Agregar al inventario</Text>
            </TouchableOpacity>

        </View>

    )
}

const styles = StyleSheet.create({

    product: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25
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
        marginBottom: 25
    },
    toogleButton: {
        backgroundColor: "blue",
        width: "100%",
        color: "white",
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        display: "flex",
        textAlign: "center"
    },
    productNotFound: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25
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
        marginBottom: 5
    }
});

const fakeProduct : PorductInterface = {
    Descripcion: "Product Description",
    Id_Familia: 123,
    Codigo: "233ABC123",
    Familia: "Product Family",
    CodigoPrecio: "XYZ456",
    Precio: 49.99,
    CodigoExsitencia: "EFG789",
    Existencia: 100,
    Id_Almacen: 1,
    Marca: "BrandXYZ",
    Id_Marca: 456,
    Id_ListaPrecios: 789,
    Piezas: 0,
    Impto: 0.08,
    imagen: [{
        url: "https://example.com/image.jpg",
        id: 1234
    }]
};
