import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { buttonStyles } from '../../theme/UI/buttons';
import { colores, globalStyles } from '../../theme/appTheme';
import { inputStyles } from '../../theme/UI/inputs';
import { updateCostos } from '../../services/costos';
import { useNavigation } from '@react-navigation/native';

export const CodebarUpdateWithInputScreen = ({productDetails, selectedProduct} : any) => {

    const [text, setText] = useState('');
    const navigation = useNavigation<any>();

    const handleTextChange = (inputText: string) => {
        setText(inputText);
    };

    const hanldeUpdateCodebarWithCodeRandom = async () => {
        if (!productDetails) return;

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


    return (
        <View style={styles.CodebarUpdateWithInputScreen}>

            <Text style={styles.inputLabel}>Escribe el codigo que quieras</Text>

            <TextInput
                style={[inputStyles.input, globalStyles.globalMarginBottomSmall]}
                placeholder="Ej: 654s1q"
                onChangeText={handleTextChange}
            />

            {text.length >= 5 && (
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
        marginBottom: 10,
        fontWeight: "bold"
    },
})
