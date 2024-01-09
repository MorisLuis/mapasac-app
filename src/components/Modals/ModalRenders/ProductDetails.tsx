import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface ProductDetailsInterface {
    scannedCodes?: string
}

export const ProductDetails = ({
    scannedCodes
} : ProductDetailsInterface) => {

    return (
        <View style={styles.product}>
            <View style={styles.productCarrousel}>
                <Image
                    style={styles.productImage}
                    source={{
                        uri: 'https://images.unsplash.com/photo-1704402838495-7d2ac0798b8d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    }}
                />
            </View>

            <View style={styles.productHeader}>
                <Text style={styles.productTitle}>Producto encontrado</Text>
                <View>
                    <Text style={styles.productPriceLabel}>Precio: </Text>
                    <Text>$ 356.75 MXN </Text>
                </View>
            </View>

            <View style={styles.productObservations}>
                <Text style={styles.productObservationsLabel}>Obervaciones: </Text>
                <Text>ESTA ES UNA PRUEBA DE OBSERVACIONES</Text>
            </View>

            <View style={styles.productData}>
                <View style={styles.productDataItem}>
                    <Text style={styles.productDataLabel}>Codigo: </Text>
                    <Text>K-772</Text>
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.productDataItem}>
                    <Text style={styles.productDataLabel}>Marca: </Text>
                    <Text>KRONNOR</Text>
                </View>
                <View style={styles.horizontalLine} />
                <View style={styles.productDataItem}>
                    <Text style={styles.productDataLabel}>Familia: </Text>
                    <Text>ABRAZADERAS</Text>
                </View>
                <View style={styles.horizontalLine} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    product: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 25
    },
    productCarrousel: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row"
    },
    productImage: {
        width: "100%",
        height: 300
    },
    productHeader: {
        width: "100%",
        paddingVertical: 20
    },
    productTitle: {
        fontSize: 25,
        fontWeight: "bold"
    },
    productPriceLabel: {
        fontWeight: "bold"
    },
    productObservations: {
        backgroundColor:"beige",
        width: "100%",
        padding: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 15
    },
    productObservationsLabel: {
        fontWeight: "bold"
    },
    productData: {
        backgroundColor:"beige",
        width: "100%",
        padding: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 15
    },
    productDataItem: {
        display: "flex",
        flexDirection: "row",
        paddingBottom: 15
    },
    productDataLabel: {
        fontWeight: "bold"
    },
    horizontalLine: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: '100%',
        marginBottom: 15
    }
    
});
