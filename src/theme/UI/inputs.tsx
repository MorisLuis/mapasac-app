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