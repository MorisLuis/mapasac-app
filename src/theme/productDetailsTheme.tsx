import { StyleSheet } from "react-native";
import { colores, globalFont, globalStyles } from "./appTheme";
import { Animated } from "react-native";

//const translateXValue: Animated.Value = new Animated.Value(0);

export const productDetailsStyles = StyleSheet.create({
    ProductDetailsPage: {
        padding: 20,
        height: "100%",
        backgroundColor: colores.background_color
    },
    imageContainer: {
        //flex: 1,
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
        minHeight: 200,
        height: "90%",
        width: "60%",
        resizeMode: 'contain',
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
    },
    header: {
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
    },
    description: {
        fontSize: globalFont.font_med,
        fontWeight: "bold"
    },
    price: {
        fontWeight: "bold"
    },
    information: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colores.background_color_secondary,
        borderWidth: 1,
        borderColor: `${colores.color_border}${Math.round(0.3 * 255).toString(16)}`,
        borderRadius: 5,
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    data: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 10,
        position: "relative"
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10
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
})
