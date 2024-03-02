import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { getProductByCodeBar } from '../../../services/products';

export const ProductFindByCodebarInput = ({
    handleOpenProductsFoundByCodebar
} : any) => {

    const [Barcode, onChangeBarcode] = useState('');

    const handleSearchProductByCodebarInput = async () => {
        const response = await getProductByCodeBar(Barcode);
        handleOpenProductsFoundByCodebar(response)
    }

    return (
        <View style={styles.ProductFindByCodebarInput}>
            <Text style={styles.ProductFindByCodebarInput_title}>Escribe el codigo de barras:</Text>
            <TextInput
                style={styles.ProductFindByCodebarInput_input}
                onChangeText={onChangeBarcode}
                value={Barcode}
                placeholder="useless placeholder"
            />
            <TouchableOpacity
                style={styles.ProductFindByCodebarInput_button}
                onPress={handleSearchProductByCodebarInput}
            >
                <Text style={styles.ProductFindByCodebarInput_button_text}>Buscar producto</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    ProductFindByCodebarInput: {
        // Aplica cualquier estilo necesario para la vista principal
    },
    ProductFindByCodebarInput_title: {
        marginBottom: 10,
    },
    ProductFindByCodebarInput_input: {
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 10,
        color: "black",
        marginBottom: 10
    },
    ProductFindByCodebarInput_button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        display: "flex",
        alignItems: "center"
    },
    ProductFindByCodebarInput_button_text: {
        color: "white"
    }
});