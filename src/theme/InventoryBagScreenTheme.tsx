import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";




export const InventoryBagScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    InventoryBagScreen: {
        height: '100%',
        padding: globalStyles(theme).globalPadding.padding,
        backgroundColor: theme.background_color
    },
    content: {
        minHeight: "auto",
        height: "85%"
    },
    message: {
        padding: globalStyles(theme).globalPadding.padding,
        color: theme.text_color
    },
    footer: {
        backgroundColor: theme.background_color,
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: globalStyles(theme).globalPadding.padding,
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