import { StyleSheet } from 'react-native';
import { colores, globalFont, globalStyles } from '../appTheme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
    title: {
        fontSize: globalFont.font_med,
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    productInventoryCard: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: colores.color_border_secondary,
        backgroundColor: colores.background_color_secondary,
        borderRadius: globalStyles.borderRadius.borderRadius,
        padding: globalStyles.globalPadding.padding / 2,
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    productInventoryCard__Image: {
        width: wp("15%"),
        minHeight: wp("17.5%"),
        marginRight: globalStyles.globalMarginBottom.marginBottom,
        borderRadius: globalStyles.borderRadius.borderRadius / 2,
    },
    productInventoryCard__data: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        maxWidth: "100%"
    },
    dataItem: {
        display: "flex",
        flexDirection: "row"
    },
    dataItemText: {
        fontSize: globalFont.font_normal
    },
    label: {
        fontWeight: "bold",
        marginRight: globalStyles.globalMarginBottomSmall.marginBottom,
        fontSize: globalFont.font_normal
    },
    information: {
        maxWidth: "80%"
    },
    description: {
        fontWeight: "bold",
        fontSize: globalFont.font_normal,
        marginBottom: globalStyles.globalMarginBottomSmall.marginBottom / 2
    },
    stock: {
        backgroundColor: colores.background_color,
        borderColor: colores.color_border,
        borderWidth: 1,
        borderRadius: globalStyles.borderRadius.borderRadius,
        padding: globalStyles.globalPadding.padding / 2,
        minWidth: hp("6%"),
        height: hp("6%"),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    delete: {
        color: "red",
        paddingVertical: globalStyles.globalPadding.padding / 2
    },



    notImage: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        minHeight: 70,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: colores.background_color_tertiary,
        borderWidth: 1,
        borderColor: colores.color_border
    },
    notImageText: {
        fontWeight: 'bold',
        fontSize: 8,
        textAlign: "center",
        lineHeight: 8, 
        maxHeight: 40,
        overflow: 'hidden',
        paddingHorizontal: 2
    },
});