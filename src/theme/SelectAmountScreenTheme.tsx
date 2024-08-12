import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const SelectAmountScreenTheme = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SelectAmountScreen: {
        flex:1,
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        backgroundColor: theme.background_color
    },
    header: {
        padding: globalStyles(theme).globalPadding.padding,
        
    },
    headerTitle: {
        fontSize: globalFont.font_med,
        textAlign:"center",
        color: theme.text_color
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