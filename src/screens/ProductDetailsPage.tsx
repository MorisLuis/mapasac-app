import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getProductDetails } from '../services/products';
import PorductInterface from '../interface/product';
import { LoadingScreen } from './LoadingScreen';

export const ProductDetailsPage = ({ route }: any) => {
    const imageDefault = 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2762&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    const { selectedProduct: { Codigo, Marca } } = route.params;
    const [productDetails, setProductDetails] = useState<PorductInterface>()

    const handleGetProductDetails = async () => {
        const productData = await getProductDetails(Codigo, Marca);
        setProductDetails(productData)
    }

    const handleCreateCodebar = async () => {

        alert("No disponible aun")

        /* if (!productDetails) return;

        await updateCostos({
            codigo: productDetails?.Codigo,
            Id_Marca: productDetails?.Id_Marca
        }) */
    }

    useEffect(() => {
        handleGetProductDetails()
    }, [])

    return productDetails ?
        <View style={styles.ProductDetailsPage}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri: productDetails?.imagen ? productDetails?.imagen[0]?.url : imageDefault,
                    }}
                />
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Descripcion: </Text>
                <Text style={styles.data}>{productDetails?.Descripcion}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Codigo: </Text>
                <Text style={styles.data}>{productDetails?.Codigo}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Existencia: </Text>
                <Text style={styles.data}>{productDetails?.Existencia}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Familia: </Text>
                <Text style={styles.data}>{productDetails?.Familia}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Marca: </Text>
                <Text style={styles.data}>{productDetails?.Marca}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Piezas: </Text>
                <Text>{productDetails?.Piezas || productDetails?.Existencia}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Precio: </Text>
                <Text style={styles.data}>{productDetails?.Precio}</Text>
            </View>
            {
                productDetails?.CodBar ?
                    <View style={styles.section}>
                        <Text style={styles.title}>Codigo de barras: </Text>
                        <Text style={styles.data}>{productDetails?.CodBar}</Text>
                    </View>
                    :
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button} onPress={handleCreateCodebar}>
                            <Text style={styles.buttonText}>Crear codigo de barras</Text>
                        </TouchableOpacity>
                    </View>
            }
            {/* <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handleCreateCodebar}>
                    <Text style={styles.buttonText}>Crear codigo de barras</Text>
                </TouchableOpacity>
            </View> */}
        </View>
        :
        <LoadingScreen/>
}

const styles = StyleSheet.create({
    ProductDetailsPage: {
        padding: 20
    },
    section: {
        marginBottom: 10,
        display: "flex",
        flexDirection: "row"
    },
    imageContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    image: {
        width: "50%",
        minHeight: 120,
        marginRight: 10,
        borderRadius: 5
    },
    title: {
        fontWeight: "bold"
    },
    data: {

    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
