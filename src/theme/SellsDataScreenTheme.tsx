import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const SellsDataScreenTheme = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SellsDataScreen: {
        height: "auto",
        //flex:1,
        paddingHorizontal: globalStyles(theme).globalPadding.padding
    },
    imageContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: '100%',
        padding: globalStyles(theme).globalPadding.padding
    },
    image: {
        borderWidth: 3,
        borderRadius: globalStyles(theme).borderRadius.borderRadius * 2,
        borderColor: theme.background_color_secondary,
        resizeMode: "cover",
        display: "flex",
        width: wp("50%"),
        height: hp("20%"),
        minHeight: 140,
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2,
    },

    notImage: {
        borderWidth: 2,
        borderRadius: globalStyles(theme).borderRadius.borderRadius * 2,
        borderColor: theme.background_color_secondary,
        display: "flex",
        width: wp("50%"),
        height: hp("20%"),
        minHeight: 140,
        backgroundColor: theme.background_color_tertiary
    },

    titleContent: {
        width: '100%',
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        backgroundColor: theme.background_color_secondary,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    title: {
        padding: globalStyles(theme).globalPadding.padding / 2,
        fontSize: globalFont.font_med,
        color: theme.text_color_light,
        textAlign: "center"
    },
    inputContainer: {
        width: '100%',
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        backgroundColor: theme.background_color_secondary,
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: globalStyles(theme).globalPadding.padding / 1.5
    },
    inputContainer_left: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 6
    },
    label: {
        fontSize: globalFont.font_normal,
        color: theme.text_color_light
    },
})