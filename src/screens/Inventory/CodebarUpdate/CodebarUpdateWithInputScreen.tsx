import React, { useContext, useState } from 'react'
import { KeyboardType, SafeAreaView, TextInput, View } from 'react-native'
import { globalStyles } from '../../../theme/appTheme';
import { inputStyles } from '../../../theme/Components/inputs';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import codebartypes from '../../../utils/codebarTypes.json';
import { CodebarUpdateWithInputScreenStyles } from '../../../theme/Screens/Inventory/CodebarUpdateWithInputScreenTheme';
import { useTheme } from '../../../context/ThemeContext';
import { updateCodeBar } from '../../../services/codebar';
import { getProductByCodeBar } from '../../../services/products';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/Ui/CustumText';
import ButtonCustum from '../../../components/Inputs/ButtonCustum';
import FooterScreen from '../../../components/Navigation/FooterScreen';
import ModalDecision from '../../../components/Modals/ModalDecision';
import { CodebarNavigationProp } from '../../../interface/navigation';

interface CodebarUpdateWithInputScreenInterface {
    selectedProduct: { idinvearts: number }
}

export const CodebarUpdateWithInputScreen = ({ selectedProduct }: CodebarUpdateWithInputScreenInterface) => {

    const { goBack } = useNavigation<CodebarNavigationProp>();
    const { theme, typeTheme } = useTheme();
    const { codebarType } = useContext(SettingsContext);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [openModalDecision, setOpenModalDecision] = useState(false)
    const { handleError } = useErrorHandler()

    const currentType = codebartypes.barcodes.find((code) => code.id === codebarType)
    const regex = new RegExp(currentType?.regex as string);

    const hanldeUpdateCodebarWithCodeRandom = async () => {
        try {
            if (!selectedProduct) return;
            if (!regex.test(text)) return;
            setLoading(true)

            const response = await getProductByCodeBar({ codeBar: text });
            if (response.error) return handleError(response.error);

            if (response.length > 0) {
                setOpenModalDecision(true);
            } else {
                onUpdateCodeBar()
            }
        } catch (error) {
            handleError(error)
        }
    }

    const onCancel = () => {
        goBack()
        goBack()
        setLoading(false)
    }


    const onUpdateCodeBar = async () => {
        try {
            const codebar = await updateCodeBar({
                codebarras: text as string,
                idinvearts: selectedProduct.idinvearts
            });
            if (codebar.error) return handleError(codebar.error);
            goBack()
            goBack()
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false)
        };
    }

    const handleTextChange = (value: string) => {
        setText(value);
    };

    return (
        <>
            <SafeAreaView style={{ backgroundColor: theme.background_color }} >
                <View style={CodebarUpdateWithInputScreenStyles(theme).CodebarUpdateWithInputScreen}>

                    <CustomText style={CodebarUpdateWithInputScreenStyles(theme).inputLabel}>Escribe el codigo que quieras.</CustomText>

                    <CustomText style={CodebarUpdateWithInputScreenStyles(theme, typeTheme).warningMessage}>{currentType?.errorMessage}</CustomText>

                    <TextInput
                        style={[inputStyles(theme).input, globalStyles(theme).globalMarginBottomSmall]}
                        placeholder="Ej: 654s1q"
                        onChangeText={handleTextChange}
                        keyboardType={currentType?.keyboardType as KeyboardType}
                        maxLength={currentType?.maxLength}
                        placeholderTextColor={theme.text_color}
                    />

                    <FooterScreen
                        buttonTitle='Actualizar'
                        buttonDisabled={loading || !regex.test(text)}
                        buttonOnPress={hanldeUpdateCodebarWithCodeRandom}
                    />

                    {regex.test(text) && (
                        <ButtonCustum
                            title="Actualizar"
                            onPress={hanldeUpdateCodebarWithCodeRandom}
                            disabled={loading}
                        />
                    )}
                </View>
            </SafeAreaView>
            <ModalDecision visible={openModalDecision} message="Seguro de limpiar el inventario actual?">
                <ButtonCustum
                    title="Ya existe un producto con este codigo de barras. Deseas continuar?"
                    onPress={onUpdateCodeBar}
                    //disabled={loadingCleanBag}
                    iconName="close"
                    extraStyles={{ ...globalStyles(theme).globalMarginBottomSmall }}
                />
                <ButtonCustum
                    title="Cancelar"
                    onPress={onCancel}
                    //disabled={loadingCleanBag}
                />
            </ModalDecision>
        </>
    )
}