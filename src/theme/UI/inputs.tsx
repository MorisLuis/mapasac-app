import { StyleSheet } from "react-native";
import { colores, globalFont, globalStyles } from "../appTheme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const inputStyles = StyleSheet.create({
    input: {
        height: hp("5%"),
        minHeight: 45,
        borderWidth: 1,
        borderColor: colores.color_border,
        borderRadius: globalStyles.borderRadius.borderRadius,
        fontSize: globalFont.font_normal,
        paddingHorizontal: globalStyles.globalPadding.padding,
        backgroundColor: colores.background_color_secondary,
        gap: 10
    },

    inputicon: {
        marginLeft: 20,
        backgroundColor: "red"
    },

    focusedInput: {
        borderWidth: 1,
        borderColor: 'transparent',
    }
});


export const selectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: globalFont.font_normal,
        paddingVertical: globalStyles.globalPadding.padding,
        paddingHorizontal: globalStyles.globalPadding.padding,
        borderWidth: 1,
        borderColor: colores.color_border_secondary,
        borderRadius: globalStyles.borderRadius.borderRadius,
        color: colores.text_color,
        paddingRight: globalStyles.globalPadding.padding,
        backgroundColor: colores.background_color,
    },
    inputAndroid: {
        fontSize: globalFont.font_normal,
        paddingHorizontal: globalStyles.globalPadding.padding,
        paddingVertical: globalStyles.globalPadding.padding,
        borderWidth: 0.5,
        borderColor: colores.color_border_secondary,
        borderRadius: globalStyles.borderRadius.borderRadius,
        color: 'black',
        paddingRight: globalStyles.globalPadding.padding,
        backgroundColor: 'white',
    },
    modalViewMiddle: {
        backgroundColor: colores.background_color_tertiary,
    },
    modalViewBottom: {
        backgroundColor: colores.background_color,
    }
})