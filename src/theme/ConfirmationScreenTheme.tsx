import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ConfirmationScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({

    ConfirmationScreen: {
        height: "100%",
        backgroundColor: theme.background_color,
        padding: globalStyles(theme).globalPadding.padding
    },
    confirmationSells: {
        borderBottomWidth: 1,
        borderBottomColor: theme.color_border_tertiary,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    confirmation: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
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
        borderBottomWidth: 1,
        borderBottomColor: theme.color_border_tertiary,
        paddingVertical: globalStyles(theme).globalPadding.padding,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
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
    confirmationDataHeader: {
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom / 2
    },
    paymentMethodContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    paymentMethodClient: {
        display: "flex",
        gap: 10,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    paymentMethodItem: {
        flex: 1,
        backgroundColor: theme.background_color_tertiary,
        width: "100%",
        padding: globalStyles(theme).globalPadding.padding,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: theme.color_border_tertiary
    },
    paymentMethodItemActive: {
        flex: 1,
        backgroundColor: theme.color_tertiary,
        width: "100%",
        padding: globalStyles(theme).globalPadding.padding,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: theme.color_border
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
    }
})