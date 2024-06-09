import { StyleSheet } from "react-native";
import { colores, globalFont, globalStyles } from "./appTheme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const InventoryStyles = StyleSheet.create({
    Inventory: {
        backgroundColor: colores.background_color
    },
    content: {
        paddingHorizontal: globalStyles.globalPadding.padding,
        backgroundColor: colores.background_color,
        height: "100%"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
        marginTop: globalStyles.globalMarginBottom.marginBottom * 2
    },
    title: {
        display: "flex",
        fontSize: globalFont.font_med,
        paddingVertical: globalStyles.globalPadding.padding / 2 
    },
    actions: {
        display: "flex",
        flexDirection: "row"
    },
    iconSearch: {
        marginLeft: globalStyles.globalMarginBottom.marginBottom
    }
})