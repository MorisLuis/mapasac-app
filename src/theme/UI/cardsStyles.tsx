import { StyleSheet } from 'react-native';
import { Theme, globalFont, globalStyles } from '../appTheme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const styles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    title: {
        fontSize: globalFont.font_med,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    productInventoryCard: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: typeTheme === 'light' ? theme.color_border_tertiary : theme.color_border_tertiary,
        backgroundColor: theme.background_color_secondary,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        padding: globalStyles(theme).globalPadding.padding / 2,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
    },
    productInventoryCard__data: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        //gap: "10%"
    },
    dataItem: {
        display: "flex",
        flexDirection: "row"
    },
    dataItemText: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    label: {
        fontWeight: "bold",
        marginRight: globalStyles(theme).globalMarginBottomSmall.marginBottom,
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    information: {
        width: "72.5%"
    },
    quantity: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: "flex-end",
        width: "22.5%"
    },
    quantity_value: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    quantity_unity: {
        display: "flex",
        fontSize: globalFont.font_sm,
        width: "auto",
        color: theme.text_color
    },
    description: {
        fontWeight: "bold",
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    stock: {
        backgroundColor: theme.background_color,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color,
        borderWidth: 1,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        padding: globalStyles(theme).globalPadding.padding / 2,
        minWidth: hp("6%"),
        height: hp("6%"),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    delete: {
        color: typeTheme === 'light' ? theme.color_red : theme.color_tertiary,
        paddingTop: globalStyles(theme).globalPadding.padding / 2
    }
});

export const EmptyMessageCardStyles = (theme: Theme, typeTheme: string) => StyleSheet.create({
    EmptyMessageCard: {
        backgroundColor: theme.background_color,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.color_border_tertiary,
        width: "100%",
        padding: globalStyles(theme).globalPadding.padding,
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: globalFont.font_med,
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom,
        color: theme.text_color
    },
    iconContainer: {
        backgroundColor: theme.background_color_secondary,
        borderWidth: 1,
        borderColor: theme.color_border,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    icon: {
        textAlign: "center"
    },
    message: {
        color: theme.text_color
    }
})

export const MessageCardStyles = (theme: Theme, typeTheme: string) => StyleSheet.create({
    MessageCard: {
        backgroundColor: theme.color_tertiary_opacity,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.color_border_tertiary,
        width: "100%",
        padding: globalStyles(theme).globalPadding.padding / 2,
        borderRadius: 10,
        display: "flex",
        flexDirection: 'row',
        alignItems: "center"
    },
    text:{

    },
    title: {
        fontWeight: "bold",
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: globalStyles(theme).globalMarginBottomSmall.marginBottom
    },
    icon: {
        textAlign: "center"
    },
    message: {
        color: theme.text_color
    }
})


export const ProductItemSearchStyles = (theme: Theme, typeTheme: string) => StyleSheet.create({
    ProductItemSearch: {
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom,
        borderWidth: 1,
        paddingVertical: globalStyles(theme).globalPadding.padding / 2,
        paddingHorizontal: globalStyles(theme).globalPadding.padding / 2,

        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.background_color_secondary,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.color_border_tertiary,
    },
    productInventoryCard__Image: {
        width: wp("17.5%"),
        minHeight: wp("17.5%"),
        marginRight: globalStyles(theme).globalMarginBottom.marginBottom,
        borderRadius: globalStyles(theme).borderRadius.borderRadius
    },
    information: {
        alignItems: 'flex-start'
    },
    description: {
        fontWeight: "bold",
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    otherInformation: {
        display: "flex",
        flexDirection: "row",
        gap: 5
    },
    otherInformationText: {
        fontSize: globalFont.font_sm,
        color: theme.text_color
    },
    codebarAvailable: {
        backgroundColor: typeTheme === 'light' ? theme.color_border_tertiary + '23' : theme.color_border_secondary + '23',
        padding: globalStyles(theme).globalPadding.padding / 5,
        paddingHorizontal: globalStyles(theme).globalPadding.padding / 2,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        marginVertical: globalStyles(theme).globalMarginBottomSmall.marginBottom
    },
    textAvailable: {
        color: typeTheme === 'light' ? theme.color_border_tertiary : theme.color_border_secondary,
        fontSize: globalFont.font_normal
    },
    codebarNotAvailable: {
        backgroundColor: theme.color_red + '13',
        padding: globalStyles(theme).globalPadding.padding / 3,
        paddingHorizontal: globalStyles(theme).globalPadding.padding / 2,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        marginVertical: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2
    },
    textNotAvailable: {
        color: theme.color_red,
        fontSize: globalFont.font_normal
    },
    notImage: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp("17.5%"),
        minHeight: wp("17.5%"),
        marginRight: globalStyles(theme).globalMarginBottom.marginBottom,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        backgroundColor: theme.background_color_tertiary,
        borderWidth: 1,
        borderColor: theme.color_border
    },
    notImageText: {
        fontWeight: 'bold',
        fontSize: globalFont.font_normal / 2,
        textAlign: "center",
        lineHeight: 8,
        maxHeight: 40,
        overflow: 'hidden',
        paddingHorizontal: 2
    },
})

export const ProductInventoryConfirmationCardTheme = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    title: {
        fontSize: globalFont.font_med,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    ProductInventoryConfirmationCard: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: typeTheme === 'light' ? theme.color_border_tertiary : theme.color_border_tertiary,
        backgroundColor: theme.background_color_secondary,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        paddingVertical: globalStyles(theme).globalPadding.padding / 2,
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom,
        marginHorizontal: globalStyles(theme).globalMarginBottom.marginBottom

    },
    data: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        maxWidth: "100%"
    },
    dataItem: {
        display: "flex",
        flexDirection: "row"
    },
    dataItemText: {
        fontSize: globalFont.font_sm,
        color: theme.text_color
    },
    label: {
        marginRight: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2,
        fontSize: globalFont.font_sm,
        color: theme.text_color
    },
    information: {
        maxWidth: "80%"
    },
    description: {
        fontSize: globalFont.font_sm,
        color: theme.text_color
    },
    edit: {
        display: "flex",
        alignContent: "center",
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.color_border_tertiary,
        borderRadius: globalStyles(theme).borderRadius.borderRadius
    }
});

export const ProductSellsCardTheme = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    ProductSellsCardTheme: {
        flex: 1,
        display: "flex"
    },
    image: {
        flex: 1,
        borderWidth: 3,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        borderColor: theme.background_color_secondary,
        resizeMode: "cover",
        width: "100%",
        height: hp("15%"),
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2,
    },
    shadowImage: {
    },
    notImage: {
        flex: 1,
        borderWidth: 2,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        borderColor: theme.background_color_secondary,
        resizeMode: "cover",
        width: "100%",
        height: hp("15%"),
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2,
        backgroundColor: theme.background_color_tertiary
    },
    title: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        //fontWeight: 'bold'
    }

});