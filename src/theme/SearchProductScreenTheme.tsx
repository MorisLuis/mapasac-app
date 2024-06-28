import { StyleSheet } from "react-native";
import {Theme, globalFont, globalStyles } from "./appTheme";


export const SearchProductScreenStyles = (theme: Theme) => StyleSheet.create({
    SearchProductScreen: {
        flex: 1,
        backgroundColor: theme.background_color
    },
    content: {
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        marginTop: globalStyles(theme).globalPadding.padding,
    },
    searchAdvice: {

    },
    adviceHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    titleHeader: {
        fontSize: globalFont.font_normal,
        color: theme.color_red,
        fontWeight: "bold"
    },
    adviceMessage: {},
    adviceMessage1: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        fontSize: globalFont.font_normal
    },
    adviceMessage2: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        fontSize: globalFont.font_normal
    }
})