import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";


export const uiElementeStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({

    tagContainer: {
        padding: globalStyles(theme).globalPadding.padding / 4,
        paddingHorizontal: globalStyles(theme).globalPadding.padding / 2,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
    },
    tagText: {
        fontSize: globalFont.font_sm
    },
    green: {
        backgroundColor: typeTheme === 'light' ?  theme.color_green + '30' : theme.color_tertiary + '13',
        borderWidth: 0.5,
        borderColor: theme.color_green,
        color:  typeTheme === 'light' ? theme.color_green : theme.color_tertiary,
    }

});