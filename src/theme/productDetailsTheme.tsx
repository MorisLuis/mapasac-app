import { StyleSheet } from "react-native";
import { colores, globalFont, globalStyles } from "./appTheme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const productDetailsStyles = StyleSheet.create({
    ProductDetailsPage: {
        flex: 1,
        padding: globalStyles.globalPadding.padding,
        backgroundColor: colores.background_color,
    },
    imageContainer: {
        minHeight: 300,
        backgroundColor: colores.background_color_tertiary,
        borderWidth: 1,
        borderColor: colores.color_border,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    image: {
        position: 'absolute',
        height: hp("30%"),
        width: wp("50%"),
        resizeMode: 'contain',
        backgroundColor: colores.background_color_tertiary,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    notImage: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    notImageText: {
        fontWeight: 'bold',
        fontSize: globalFont.font_med,
        textAlign: "center",
        lineHeight: globalFont.font_med,
        overflow: 'hidden',
        paddingHorizontal: globalStyles.globalPadding.padding
    },
    header: {
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
    },
    description: {
        fontSize: globalFont.font_med,
        fontWeight: "bold"
    },
    price: {
        fontWeight: "bold",
        fontSize: globalFont.font_normal,
    },
    priceValue: {
        fontSize: globalFont.font_normal,
    },
    information: {
        paddingVertical: globalStyles.globalPadding.padding / 2,
        paddingHorizontal:  globalStyles.globalPadding.padding,
        backgroundColor: colores.background_color_secondary,
        borderWidth: 1,
        borderColor: `${colores.color_border}${Math.round(0.3 * 255).toString(16)}`,
        borderRadius: 5,
        marginBottom: globalStyles.globalMarginBottom.marginBottom * 2
    },
    data: {
        display: "flex",
        flexDirection: "row",
        paddingVertical:  globalStyles.globalPadding.padding / 2,
        position: "relative"
    },
    label: {
        fontWeight: 'bold',
        fontSize: globalFont.font_normal,
        marginRight: globalStyles.globalMarginBottom.marginBottom / 2
    },
    dataValue: {
        fontSize: globalFont.font_normal,
    },
    separator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 1,
        borderBottomWidth: 1,
        borderBottomColor: `${colores.color_tertiary}${Math.round(0.25 * 255).toString(16)}`,
    },
    optionsContent:{

    },
    optionCodebar: {
        backgroundColor: colores.background_color_secondary,
        padding: globalStyles.globalPadding.padding,
        borderRadius: globalStyles.borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: colores.color_border,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: globalStyles.globalMarginBottomSmall.marginBottom
    },
    optionCodebar_icon: {
        marginRight: globalStyles.globalMarginBottomSmall.marginBottom,
    },
    selectedOption:{
        backgroundColor: colores.color_yellow,
        borderColor: colores.color_border_tertiary,
        display: "flex"
    },

    //Footer
    footer: {
        //position: "absolute",
        bottom: 0,
        height: 100,
        width: "100%",
        backgroundColor: colores.background_color_secondary,
        borderTopWidth: 1,
        borderColor: colores.color_border,
        padding: globalStyles.globalPadding.padding,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})
