import { StyleSheet } from "react-native";
import { colores, globalFont } from "../appTheme";

export const inputStyles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: colores.color_border,
        borderRadius: 8,
        fontSize: globalFont.font_normal,
        paddingHorizontal: 8,
        backgroundColor: colores.background_color_secondary
    },

    focusedInput: {
        borderWidth: 1,
        borderColor: 'transparent',
    },

    validInput: {

    }
});

export const selectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: colores.color_border_secondary,
        borderRadius: 4,
        color: colores.text_color,
        paddingRight: 30,
        backgroundColor: colores.background_color,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        backgroundColor: 'white',
    },
    // Estilos específicos del modal
    modalViewMiddle: {
        backgroundColor: colores.background_color_tertiary,
    },
    modalViewBottom: {
        backgroundColor: colores.background_color,
    }
})