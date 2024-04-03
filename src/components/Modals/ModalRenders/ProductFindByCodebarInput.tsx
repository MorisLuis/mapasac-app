import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getProductByCodeBar } from '../../../services/products';
import { buttonStyles } from '../../../theme/UI/buttons';
import { colores, globalStyles } from '../../../theme/appTheme';
import { inputStyles } from '../../../theme/UI/inputs';
import PorductInterface from '../../../interface/product';
import { AuthContext } from '../../../context/auth/AuthContext';

interface ProductFindByCodebarInputInterface {
    handleOpenProductsFoundByCodebar: (response: PorductInterface[]) => void
}

export const ProductFindByCodebarInput = ({
    handleOpenProductsFoundByCodebar
}: ProductFindByCodebarInputInterface) => {

    const [Barcode, onChangeBarcode] = useState('');
    const [typeOfSearch, setTypeOfSearch] = useState('code')
    const { updateBarCode } = useContext(AuthContext);

    const handleSearchProductByCodebarInput = async () => {
        updateBarCode('')
        let response;
        if(typeOfSearch === 'code') {
            response = await getProductByCodeBar(undefined, Barcode);
        } else {
            updateBarCode(Barcode)
            response = await getProductByCodeBar(Barcode, undefined);
        }
        handleOpenProductsFoundByCodebar(response)
    }

    return (
        <View style={styles.ProductFindByCodebarInput}>

            <Text style={styles.ProductFindByCodebarInput_title}>Escribe el { typeOfSearch === 'code' ? 'Codigo' : 'Codigo de barras'}:</Text>
            <TextInput
                style={[inputStyles.input, globalStyles.globalMarginBottomSmall]}
                onChangeText={onChangeBarcode}
                value={Barcode}
                placeholder="Ej: 6541q"
            />
            <TouchableOpacity
                style={[buttonStyles.button, buttonStyles.black, globalStyles.globalMarginBottomSmall]}
                onPress={handleSearchProductByCodebarInput}
            >
                <Text style={buttonStyles.buttonText}>Buscar producto</Text>
            </TouchableOpacity>

            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    style={[styles.option, typeOfSearch === 'code' && styles.optionActive]}
                    onPress={() => setTypeOfSearch('code')}
                >
                    <Text>Codigo de producto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.option, typeOfSearch === 'barcode' && styles.optionActive]}
                    onPress={() => setTypeOfSearch('barcode')}
                >
                    <Text>Codigo de barras</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ProductFindByCodebarInput: {
        
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
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        //marginBottom: globalStyles.globalMarginBottomSmall.marginBottom
    },
    option: {
        backgroundColor: colores.background_color_tertiary,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: colores.color_border
    },
    optionActive: {
        backgroundColor: colores.color_yellow,
        borderColor: colores.color_border_tertiary
    }
});
