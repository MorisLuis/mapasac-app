import React, { useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { getProductByClave, getProductByNoArticulo } from '../../../services/products';
import { globalStyles } from '../../../theme/appTheme';
import { inputStyles } from '../../../theme/UI/inputs';
import { SearchCodebarWithInputStyles } from '../../../theme/ModalRenders/SearchCodebarWithInputTheme';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import { useTheme } from '../../../context/ThemeContext';
import useErrorHandler from '../../../hooks/useErrorHandler';
import ProductInterface from '../../../interface/product';
import CustomText from '../../../components/Ui/CustumText';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import { InventoryNavigationProp } from '../../../interface/navigation';
import ModalBottom from '../../../components/Modals/ModalBottom';

export const SearchCodebarWithInput = () => {

    const { updateBarCode } = useContext(SettingsContext);
    const { navigate, goBack } = useNavigation<InventoryNavigationProp>();
    const { theme, typeTheme } = useTheme();

    const [Barcode, onChangeBarcode] = useState('');
    const [typeOfSearch, setTypeOfSearch] = useState('code')
    const [loadingSearch, setLoadingSearch] = useState(false)
    const { handleError } = useErrorHandler()


    const handleSearchProductByCodebarInput = async () => {

        try {
            updateBarCode('')
            setLoadingSearch(true)

            let response;
            if (typeOfSearch === 'code') {
                response = await getProductByClave({ clave: Barcode });
            } else if (typeOfSearch === 'noarticulo') {
                response = await getProductByNoArticulo({ noarticulo: Barcode });
            } else {
                updateBarCode(Barcode)
            }

            handleNavigatoToProduct(response);

            if (response.error) return handleError(response.error);

        } catch (error) {
            handleError(error);
        } finally {
            setLoadingSearch(false);
        };

    }

    const handleNavigatoToProduct = (response: ProductInterface[]) => {
        goBack()
        if (response?.length === 1) {
            navigate('[Modal] - scannerResultScreen', { product: response[0], fromProductDetails: false });
        } else if (response?.length > 1) {
            navigate('[Modal] - productsFindByCodeBarModal', { products: response });
        } else {
            navigate('[Modal] - scannerResultScreen', { product: response[0], fromProductDetails: false });
        }
    }

    const handleCloseModal = () => {
        goBack()
    }

    return (
        <ModalBottom
            visible={true}
            onClose={handleCloseModal}
        >
            <View style={SearchCodebarWithInputStyles(theme).SearchCodebarWithInput}>
                <CustomText style={SearchCodebarWithInputStyles(theme).SearchCodebarWithInput_title}>
                    Escribe el {
                        typeOfSearch === 'code' ? 'Codigo' :
                            typeOfSearch === 'noarticulo' ? "no. de articulo" :
                                'Codigo de barras'
                    }:
                </CustomText>
                <TextInput
                    style={[inputStyles(theme).input, globalStyles(theme).globalMarginBottomSmall]}
                    onChangeText={onChangeBarcode}
                    value={Barcode}
                    placeholder="Ej: 6541q"
                    placeholderTextColor={theme.color_gray}
                />

                <ButtonCustum
                    title="Buscar producto"
                    onPress={handleSearchProductByCodebarInput}
                    disabled={loadingSearch}
                    extraStyles={{ marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom }}
                />

                <ScrollView horizontal style={SearchCodebarWithInputStyles(theme).optionsContainer}>
                    <TouchableOpacity
                        style={[SearchCodebarWithInputStyles(theme).option, typeOfSearch === 'code' && SearchCodebarWithInputStyles(theme).optionActive]}
                        onPress={() => setTypeOfSearch('code')}
                    >
                        <CustomText style={
                            typeOfSearch === 'code' ?
                                SearchCodebarWithInputStyles(theme, typeTheme).optionTextActive : SearchCodebarWithInputStyles(theme, typeTheme).optionText
                        }>
                            Codigo de producto
                        </CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[SearchCodebarWithInputStyles(theme).option, typeOfSearch === 'barcode' && SearchCodebarWithInputStyles(theme).optionActive]}
                        onPress={() => setTypeOfSearch('barcode')}
                    >
                        <CustomText style={
                            typeOfSearch === 'barcode' ?
                                SearchCodebarWithInputStyles(theme, typeTheme).optionTextActive : SearchCodebarWithInputStyles(theme, typeTheme).optionText
                        }>
                            Codigo de barras
                        </CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[SearchCodebarWithInputStyles(theme).option, typeOfSearch === 'noarticulo' && SearchCodebarWithInputStyles(theme).optionActive]}
                        onPress={() => setTypeOfSearch('noarticulo')}
                    >
                        <CustomText style={
                            typeOfSearch === 'noarticulo' ?
                                SearchCodebarWithInputStyles(theme, typeTheme).optionTextActive : SearchCodebarWithInputStyles(theme, typeTheme).optionText
                        }>
                            No. articulo
                        </CustomText>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </ModalBottom>
    );
};