import React, { useContext, useState } from 'react'
import { KeyboardType, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { buttonStyles } from '../../theme/UI/buttons';
import { colores, globalFont, globalStyles } from '../../theme/appTheme';
import { inputStyles } from '../../theme/UI/inputs';
import { updateCostos } from '../../services/costos';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../../context/settings/SettingsContext';
import codebartypes from '../../utils/codebarTypes.json';
import PorductInterface from '../../interface/product';

interface CodebarUpdateWithInputScreenInterface {
    productDetails?: PorductInterface
}

export const CodebarUpdateWithInputScreen = ({ productDetails }: CodebarUpdateWithInputScreenInterface) => {

    const [text, setText] = useState('');
    const navigation = useNavigation<any>();
    const { codebarType } = useContext(SettingsContext);
    const currentType = codebartypes.barcodes.find((code: any) => code.id === codebarType)
    const regex = new RegExp(currentType?.regex as string);


    const hanldeUpdateCodebarWithCodeRandom = async () => {
        if (!productDetails) return;
        if(!regex.test(text)) return;

        await updateCostos({
            codigo: productDetails?.Codigo,
            Id_Marca: productDetails?.Id_Marca,
            body: {
                CodBar: text
            }
        })
        navigation.goBack()
        navigation.goBack()
    }

    const handleTextChange = (value: string) => {
        setText(value);
    };

    return (
        <View style={styles.CodebarUpdateWithInputScreen}>

            <Text style={styles.inputLabel}>Escribe el codigo que quieras.</Text>

            <TextInput
                style={[inputStyles.input, globalStyles.globalMarginBottomSmall]}
                placeholder="Ej: 654s1q"
                onChangeText={handleTextChange}
                keyboardType={currentType?.keyboardType as KeyboardType}
                maxLength={currentType?.maxLength}
            />

            <Text style={styles.warningMessage}>{currentType?.errorMessage}</Text>

            {regex.test(text) && (
                <TouchableOpacity style={buttonStyles.button} onPress={hanldeUpdateCodebarWithCodeRandom}>
                    <Text style={buttonStyles.buttonText}>Actualizar</Text>
                </TouchableOpacity>
            )}
        </View>)
}


const styles = StyleSheet.create({
    CodebarUpdateWithInputScreen: {
        backgroundColor: colores.background_color,
        padding: globalStyles.globalPadding.padding,
        height: "100%"
    },
    inputLabel: {
        fontSize: globalFont.font_normal,
        fontWeight: "bold",
        marginBottom: globalStyles.globalMarginBottomSmall.marginBottom
    },
    warningMessage: {
        fontSize: globalFont.font_normal,
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
        color: colores.color_red
    }
})
