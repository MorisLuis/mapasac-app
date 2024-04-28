import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getProductByCodeBar } from '../../../services/products';
import { buttonStyles } from '../../../theme/UI/buttons';
import { globalStyles } from '../../../theme/appTheme';
import { inputStyles } from '../../../theme/UI/inputs';
import PorductInterface from '../../../interface/product';
import { AuthContext } from '../../../context/auth/AuthContext';
import { modalRenderstyles } from '../../../theme/ModalRenders/SearchCodebarWithInputTheme';

interface SearchCodebarWithInputInterface {
    handleOpenProductsFoundByCodebar: (response: PorductInterface[]) => void
}

export const SearchCodebarWithInput = ({
    handleOpenProductsFoundByCodebar
}: SearchCodebarWithInputInterface) => {

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
        <View style={modalRenderstyles.SearchCodebarWithInput}>
            <Text style={modalRenderstyles.SearchCodebarWithInput_title}>Escribe el { typeOfSearch === 'code' ? 'Codigo' : 'Codigo de barras'}:</Text>
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

            <View style={modalRenderstyles.optionsContainer}>
                <TouchableOpacity
                    style={[modalRenderstyles.option, typeOfSearch === 'code' && modalRenderstyles.optionActive]}
                    onPress={() => setTypeOfSearch('code')}
                >
                    <Text>Codigo de producto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[modalRenderstyles.option, typeOfSearch === 'barcode' && modalRenderstyles.optionActive]}
                    onPress={() => setTypeOfSearch('barcode')}
                >
                    <Text>Codigo de barras</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};