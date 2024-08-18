import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";




export const InventoryBagScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    InventoryBagScreen: {
        backgroundColor: theme.background_color,
        height: "100%",
    },
    searchBar: {
        marginHorizontal: globalStyles(theme).globalPadding.padding,
        marginTop: globalStyles(theme).globalMarginBottomSmall.marginBottom,
        /* display: "flex",
        flexDirection: "row",
        alignContent: "center",
        alignItems: 'center' */
    },
    content: {
        minHeight: "auto",
        height: "85%",
        padding: globalStyles(theme).globalPadding.padding,
        marginBottom: "37.5%"
    },
    message: {
        padding: globalStyles(theme).globalPadding.padding,
        color: theme.text_color
    },
    footer: {
        backgroundColor: theme.background_color,
        padding: globalStyles(theme).globalPadding.padding,
        height: "25%",
        maxHeight: 150,
        width: "100%",
        position: "absolute",
        bottom: 0,

        borderTopWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color_secondary,
    },
    footer_actions: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footer_price: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: globalStyles(theme).globalPadding.padding / 2,
        justifyContent: "space-between"
    },
    priceText: {
        fontSize: globalFont.font_normal
    }
})