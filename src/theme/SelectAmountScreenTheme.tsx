import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const SelectAmountScreenTheme = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SelectAmountScreen: {
        height: '100%',
        padding: globalStyles(theme).globalPadding.padding,
        backgroundColor: theme.background_color
    },
    header: {
    },
    headerTitle: {
        fontSize: globalFont.font_med,
        textAlign:"center",
        color: theme.text_color,
        fontFamily: 'Rubik-Bold'
    },
    amountContent: {
        flex:1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },

    amountContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"center"
    },

    amountNumber: {
        fontSize: globalFont.font_big,
        color: theme.text_color
    }
})