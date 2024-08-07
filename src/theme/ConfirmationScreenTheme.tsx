import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ConfirmationScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({

    ConfirmationScreen: {
        flex: 1,
        backgroundColor: theme.background_color,
        height: "100%",
        padding: 20
    },
    confirmationHeader: {
        height: hp("20%"),
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    confirmationHeaderTitle: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    confirmationInfo: {
        marginHorizontal: globalStyles(theme).globalMarginBottom.marginBottom,
        borderBottomWidth: 1,
        borderBottomColor: theme.color_border_tertiary,
        paddingVertical: globalStyles(theme).globalPadding.padding,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    confirmationItems: {
        display: 'flex',
    },
    confirmationItems_number: {
        fontSize: globalFont.font_big * 1.5,
        color: theme.text_color
    },
    confirmationMovement: {
        display: "flex",
        flexDirection: 'row',
        gap: 10
    },
    confirmationProductsContent: {
        marginHorizontal: globalStyles(theme).globalMarginBottom.marginBottom
    },
    confirmationProductsContentHeader: {
        color: theme.text_color,
        fontSize: globalFont.font_sm,
        textTransform: "uppercase",
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2
    },
    confirmationText: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    footer: {
        backgroundColor: typeTheme === 'light' ? theme.background_color : theme.background_color,
        padding: globalStyles(theme).globalPadding.padding,
        maxHeight: 150,
        width: wp("100%"),
        position: "absolute",
        bottom: 0,
        display: "flex",
        borderTopWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color_secondary,
    }
})