import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const SelectScreenTheme = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SelectScreen: {
        height: "100%",
        backgroundColor: theme.background_color,
        padding: globalStyles().globalPadding.padding
    },
    header: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    headerTitle: {
        fontSize: globalFont.font_med,
        textAlign:"center",
        color: theme.text_color,
        fontFamily: 'Rubik-Bold'
    },
    optionsContainer: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: "center",
        padding: globalStyles(theme).globalPadding.padding, 
        backgroundColor: 'transparent',
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        borderWidth: 0.3,
        borderColor: theme.color_border
    },
    optionText: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        fontFamily: 'Rubil-Regular'
    },
    optionCheck: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: theme.text_color,
    }
})