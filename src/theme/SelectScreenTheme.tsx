import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const SelectScreenTheme = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SelectScreen: {
        height: "100%",
        backgroundColor: theme.background_color,
        paddingHorizontal: globalStyles(theme).globalPadding.padding
    },
    header: {
        padding: globalStyles(theme).globalPadding.padding,
    },
    headerTitle: {
        fontSize: globalFont.font_med,
        textAlign:"center",
        color: theme.text_color
    },
    optionsContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: "center",
        padding: globalStyles(theme).globalPadding.padding / 2, 
        backgroundColor: theme.background_color_secondary,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        borderRadius: globalStyles(theme).borderRadius.borderRadius
    },
    optionText: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    optionCheck: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: theme.text_color,
    },
    optionCheckActive: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: theme.text_color
    }

})