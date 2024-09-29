import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const SellsDataScreenTheme = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SellsDataScreen: {
        height: '100%',
        padding: globalStyles().globalPadding.padding,
        backgroundColor: theme.background_color
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    title: {
        fontSize: globalFont.font_big,
        fontFamily: 'Rubik-Bold',
        alignSelf: 'flex-start',
        marginRight: globalStyles(theme).globalMarginBottom.marginBottom / 2,
        maxWidth: wp("72.5%")
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
    inputContainer: {
        width: '100%',
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        backgroundColor: theme.background_color_secondary,
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: globalStyles(theme).globalPadding.padding / 1.5,
        borderWidth: 0.25,
        borderColor: theme.color_border_secondary,
    },
    inputContainer_left: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        gap: 5
    },
    inputContainer_right: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6
    },
    label: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        fontFamily: 'SourceSans3-Regular',
        //maxWidth: "45%"
    },
    labelValue: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        maxWidth: "55%"
    },
})