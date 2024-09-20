import React, { useContext, useState } from 'react'
import { Alert, KeyboardType, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { buttonStyles } from '../../../theme/UI/buttons';
import { globalStyles } from '../../../theme/appTheme';
import { inputStyles } from '../../../theme/UI/inputs';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../../../context/settings/SettingsContext';
import codebartypes from '../../../utils/codebarTypes.json';
import { CodebarUpdateWithInputScreenStyles } from '../../../theme/CodebarUpdateWithInputScreenTheme';
import { useTheme } from '../../../context/ThemeContext';
import { updateCodeBar } from '../../../services/codebar';
import DotLoader from '../../../components/Ui/DotLaoder';
import { getProductByCodeBar } from '../../../services/products';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { CodebarNavigationProp } from '../../../navigator/CodebarUpdateNavigation';

interface CodebarUpdateWithInputScreenInterface {
    selectedProduct: { idinvearts: number }
}

export const CodebarUpdateWithInputScreen = ({ selectedProduct }: CodebarUpdateWithInputScreenInterface) => {

    const { goBack } = useNavigation<CodebarNavigationProp>();
    const { theme, typeTheme } = useTheme();
    const { codebarType } = useContext(SettingsContext);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false)
    const { handleError } = useErrorHandler()

    const currentType = codebartypes.barcodes.find((code: any) => code.id === codebarType)
    const regex = new RegExp(currentType?.regex as string);


    const hanldeUpdateCodebarWithCodeRandom = async () => {

        try {
            if (!selectedProduct) return;
            if (!regex.test(text)) return;
            setLoading(true)

            const response = await getProductByCodeBar({ codeBar: text });
            if (response.error) return handleError(response.error);

            const onCancel = () => {
                goBack()
                goBack()
                setLoading(false)
            }

            if (response.length > 0) {
                Alert.alert(
                    'Ya existe un producto con este codigo de barras.',
                    'Deseas continuar?',
                    [
                        { text: 'Cancelar', style: 'cancel', onPress: onCancel },
                        { text: 'Actualizar', onPress: onUpdateCodeBar }
                    ]
                );
            } else {
                onUpdateCodeBar()
            }
        } catch (error) {
            handleError(error)
        }
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
        <View style={CodebarUpdateWithInputScreenStyles(theme).CodebarUpdateWithInputScreen}>

            <Text style={CodebarUpdateWithInputScreenStyles(theme).inputLabel}>Escribe el codigo que quieras.</Text>

            <Text style={CodebarUpdateWithInputScreenStyles(theme, typeTheme).warningMessage}>{currentType?.errorMessage}</Text>

            <TextInput
                style={[inputStyles(theme).input, globalStyles(theme).globalMarginBottomSmall]}
                placeholder="Ej: 654s1q"
                onChangeText={handleTextChange}
                keyboardType={currentType?.keyboardType as KeyboardType}
                maxLength={currentType?.maxLength}
            />

            {regex.test(text) && (
                <TouchableOpacity
                    style={buttonStyles(theme).button}
                    onPress={hanldeUpdateCodebarWithCodeRandom}
                    disabled={loading}
                >
                    <Text style={buttonStyles(theme, typeTheme).buttonText}>
                        {loading ? <DotLoader /> : "Actualizar"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>)
}