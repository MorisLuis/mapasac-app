import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getProductDetails } from '../services/products';
import PorductInterface from '../interface/product';
import { updateCostos } from '../services/costos';

export const ProductDetailsPage = ({ route }: any) => {

    const { selectedProduct: { Codigo, Marca } } = route.params;
    const navigation = useNavigation();
    const [productDetails, setProductDetails] = useState<PorductInterface>()

    // Función para navegar de regreso a Inventario
    const navigateBackToInventario = () => {
        navigation.goBack();
    };

    const handleGetProductDetails = async () => {
        const productData = await getProductDetails(Codigo, Marca);
        setProductDetails(productData)
    }

    const handleCreateCodebar = async () => {

        if (!productDetails) return;

        await updateCostos({
            codigo: productDetails?.Codigo,
            Id_Marca: productDetails?.Id_Marca
        })
    }

    useEffect(() => {
        handleGetProductDetails()
    }, [])

    return (
        <View style={styles.ProductDetailsPage}>
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
            {/* {
                productDetails?.CodBar ?
                    <View style={styles.section}>
                        <Text style={styles.title}>Codigo de barras: </Text>
                        <Text style={styles.data}>{productDetails?.CodBar}</Text>
                    </View>
                    :
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Crear codigo de barras</Text>
                        </TouchableOpacity>
                    </View>
            } */}
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handleCreateCodebar}>
                    <Text style={styles.buttonText}>Crear codigo de barras</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
