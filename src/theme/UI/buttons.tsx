import { StyleSheet } from "react-native";
import { colores, globalFont } from "../appTheme";

export const buttonStyles = StyleSheet.create({
    // Button size
    button: {
        height: 36,
        backgroundColor: colores.color_tertiary,
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 8,
        paddingHorizontal: 10,
        width: "100%",
        color: colores.text_color_secondary,
        display: "flex",
        justifyContent:"center",
        alignItems:"center"
    },

    button_small: {
        height: 26,
        backgroundColor: "#c6d1f6",
        borderColor: "transparent",
        borderRadius: 8,
        paddingHorizontal: 10,
        width: "100%",
        color: colores.color_tertiary,
    },

    button_line: {
        height: 36,
        backgroundColor: "transparent",
        borderWidth: 0,
        borderColor: "transparent",
        borderRadius: 8,
        paddingHorizontal: 10,
        width: "100%",
        color: colores.text_color_secondary,
        display: "flex",
        justifyContent:"center",
        alignItems:"center"
    },

    // Button text
    buttonText: {
        color: colores.text_color_secondary,
        fontSize: globalFont.font_normal
    },

    buttonTextSecondary: {
        color: colores.text_color,
        fontSize: globalFont.font_normal
    },

    buttonTextRed: {
        color: colores.color_red,
        fontSize: globalFont.font_normal
    },

    button_line_text: {
        textDecorationLine: "underline"
    },

    svg: {
        marginRight: 8
    },

    white: {
        backgroundColor: colores.color_primary,
        color: colores.text_color,
        borderWidth: 1,
        borderColor: colores.color_border_secondary,
    },

    search: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colores.color_border_tertiary,
        color: colores.text_color
    },

    black: {
        backgroundColor: colores.color_tertiary,
        color: colores.text_color_secondary
    },


    yellow: {
        backgroundColor: colores.color_yellow,
        color: colores.text_color_secondary
    },


    red: {
        backgroundColor: colores.color_red_light,
        color: colores.color_red_light,
    },

    transparent: {
        backgroundColor: "transparent",
        textDecorationLine: "underline"
    }

})