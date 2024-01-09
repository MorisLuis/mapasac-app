import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

interface ScannerResultInterface {
    scannedCodes?: string;
    onClose: () => void;
    handleModalProductDetails: () => void
}

export const ScannerResult = ({
    scannedCodes,
    onClose,
    handleModalProductDetails
}: ScannerResultInterface) => {
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

            <View style={styles.counter}>
                <Icon name="remove-circle-outline" size={35} color="black" />
                <Text>1</Text>
                <Icon name="add-circle-outline" size={35} color="black" />
            </View>

            <TouchableOpacity
                style={styles.toogleButton}
                onPress={handleModalProductDetails}
            >
                <Text style={styles.buttonText}>Agregar al inventario</Text>
            </TouchableOpacity>

            {/* PRODUCT NOT AVAILABLE CODE */}

            {/* <View style={styles.productNotFound}>
                            <View style={styles.productNotFoundText}>
                                <Image
                                    style={styles.productIcon}
                                    source={{
                                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                                    }}
                                />

                                <View style={styles.productNotFoundMessage}>
                                    <Text style={styles.productNotFoundTitle}>No se encontro producto.</Text>
                                    <Text>000</Text>
                                </View>
                            </View>

                            <Icon name="add-circle-sharp" size={25} color="black" />

                        </View> */}
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
