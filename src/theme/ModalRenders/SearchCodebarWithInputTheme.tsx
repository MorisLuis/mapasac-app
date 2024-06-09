import { StyleSheet } from "react-native";
import { colores, globalFont } from "../appTheme";


export const modalRenderstyles = StyleSheet.create({
    SearchCodebarWithInput: {
        
    },
    SearchCodebarWithInput_title: {
        marginBottom: 10,
        fontSize: globalFont.font_normal
    },
    SearchCodebarWithInput_input: {
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        paddingHorizontal: 10,
        color: "black",
        marginBottom: 10
    },
    SearchCodebarWithInput_button: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        display: "flex",
        alignItems: "center"
    },
    SearchCodebarWithInput_button_text: {
        color: "white"
    },
    optionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    option: {
        backgroundColor: colores.background_color_tertiary,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: colores.color_border
    },
    optionText: {
        fontSize: globalFont.font_normal
    },
    optionActive: {
        backgroundColor: colores.color_yellow,
        borderColor: colores.color_border_tertiary
    }
});
