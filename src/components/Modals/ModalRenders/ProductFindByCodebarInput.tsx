import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { getProductByCodeBar } from '../../../services/products';
import { buttonStyles } from '../../../theme/UI/buttons';
import { globalStyles } from '../../../theme/appTheme';
import { inputStyles } from '../../../theme/UI/inputs';

export const ProductFindByCodebarInput = ({
    handleOpenProductsFoundByCodebar
}: any) => {

    const [Barcode, onChangeBarcode] = useState('');

    const handleSearchProductByCodebarInput = async () => {
        const response = await getProductByCodeBar(Barcode);
        handleOpenProductsFoundByCodebar(response)
    }

    return (
        <View style={styles.ProductFindByCodebarInput}>
            <Text style={styles.ProductFindByCodebarInput_title}>Escribe el codigo de barras:</Text>
            <TextInput
                style={[inputStyles.input, globalStyles.globalMarginBottomSmall]}
                onChangeText={onChangeBarcode}
                value={Barcode}
                placeholder="Ej: 6541q"
            />
            <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.black]}
                onPress={handleSearchProductByCodebarInput}
            >
                <Text style={buttonStyles.buttonText}>Buscar producto</Text>
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
