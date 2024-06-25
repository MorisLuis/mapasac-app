import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { getProductByCodeBar } from '../../services/products';
import { buttonStyles } from '../../theme/UI/buttons';
import { colores, globalStyles } from '../../theme/appTheme';
import { inputStyles } from '../../theme/UI/inputs';
import { modalRenderstyles } from '../../theme/ModalRenders/SearchCodebarWithInputTheme';
import ModalMiddle from '../../components/Modals/ModalMiddle';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../../context/settings/SettingsContext';



export const SearchCodebarWithInput = () => {

    const [Barcode, onChangeBarcode] = useState('');
    const [typeOfSearch, setTypeOfSearch] = useState('code')
    const { updateBarCode } = useContext(SettingsContext);
    const navigation = useNavigation<any>();

    const handleSearchProductByCodebarInput = async () => {
        updateBarCode('')

        let response;
        if (typeOfSearch === 'code') {
            response = await getProductByCodeBar({ codigo: Barcode });
            navigation.goBack()
            navigation.navigate('[Modal] - scannerResultScreen', { product: response[0] });
        } else {
            updateBarCode(Barcode)
            response = await getProductByCodeBar({ codeBar: Barcode });
            navigation.goBack()
            navigation.navigate('[Modal] - scannerResultScreen', { product: response[0] });
        }
    }

    const handleCloseModal = () => {
        navigation.goBack()              
    }

    return (
        <ModalMiddle
            visible={true}
            onClose={handleCloseModal}
        >
            <View style={modalRenderstyles.SearchCodebarWithInput}>
                <Text style={modalRenderstyles.SearchCodebarWithInput_title}>Escribe el {typeOfSearch === 'code' ? 'Codigo' : 'Codigo de barras'}:</Text>
                <TextInput
                    style={[inputStyles.input, globalStyles.globalMarginBottomSmall]}
                    onChangeText={onChangeBarcode}
                    value={Barcode}
                    placeholder="Ej: 6541q"
                    placeholderTextColor={colores.color_gray}
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
                        <Text style={modalRenderstyles.optionText}>Codigo de producto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[modalRenderstyles.option, typeOfSearch === 'barcode' && modalRenderstyles.optionActive]}
                        onPress={() => setTypeOfSearch('barcode')}
                    >
                        <Text style={modalRenderstyles.optionText}>Codigo de barras</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ModalMiddle>
    );
};