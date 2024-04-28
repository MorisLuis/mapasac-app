import { StyleSheet } from "react-native";
import { globalFont, globalStyles } from "../appTheme";


export const modalRenderstyles = StyleSheet.create({
    ScannerResult: {
        paddingBottom: globalStyles.globalMarginBottom.marginBottom
    },
    product: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: globalStyles.globalMarginBottom.marginBottom
    },
    productText: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row"
    },
    productMessage: {
        marginLeft: 10
    },
    code: {
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center"
    },
    codeLabel: {
        fontSize: globalFont.font_normal,
        marginRight: globalStyles.globalMarginBottomSmall.marginBottom,
    },
    codeValue: {
        fontSize: globalFont.font_med,
        fontWeight: "bold"
    },
    otherInfo: {
        display: "flex",
        flexDirection: 'row',
        gap: 10
    },
    productIcon: {
        width: 50,
        height: 50,
    },
    counter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: globalStyles.globalMarginBottom.marginBottom
    },
    productNotFound: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: globalStyles.globalMarginBottom.marginBottom
    },
    productNotFoundText: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        width: "50%"
    },
    productNotFoundMessage: {
        marginLeft: 10
    },
    productNotFoundTitle: {
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom: globalStyles.globalMarginBottom.marginBottom
    }
});