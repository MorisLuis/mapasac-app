import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const SellsScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SellsScreen: {
        backgroundColor: theme.background_color,
    },
    content: {
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        height: "100%"
    },
    header:{
        display: "flex",
        flexDirection: "column",
        marginBottom: hp("2.5%"),
        marginTop: hp("7.5%")
    },
    header_subtitle: {
        color: theme.text_color_light,
        fontSize: globalFont.font_normal
    },
    header_total: {
        color: theme.text_color,
        fontSize: globalFont.font_med

    }
})