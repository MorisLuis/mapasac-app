import { StyleSheet } from 'react-native';
import { Theme, globalFont, globalStyles } from '../appTheme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ThemeColor } from '../../context/ThemeContext';


export const styles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    title: {
        fontSize: globalFont.font_med,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    productInventoryCard: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 0.25,
        borderColor: theme.color_border_secondary,
        backgroundColor: theme.background_color,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        padding: globalStyles(theme).globalPadding.padding / 4,
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom,
    },
    productInventoryCard__data: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: theme.background_color_secondary,
        borderWidth: 0.25,
        borderColor: theme.color_border_secondary,
        padding: globalStyles(theme).globalPadding.padding / 2,
        borderRadius: globalStyles(theme).borderRadius.borderRadius / 2
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
        marginRight: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2,
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    information: {
        width: "72.5%",
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
        fontSize: globalFont.font_med / 1.25,
        color: theme.text_color
    },
    deleteContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: globalStyles(theme).globalPadding.padding / 2
    },
    delete: {
        color: theme.color_red,
        marginLeft: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
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
    text: {

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
    ProductItemSearchSelected: {
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom,
        borderWidth: 1,
        paddingVertical: globalStyles(theme).globalPadding.padding / 2,
        paddingHorizontal: globalStyles(theme).globalPadding.padding / 2,

        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.color_tertiary,
        borderColor: typeTheme === 'light' ? theme.color_border_tertiary : theme.color_border_tertiary,
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

export const ProductSellsCardTheme = (theme: Theme, typeTheme?: ThemeColor) => StyleSheet.create({
    ProductSellsCardTheme: {
        flex: 0.5,
        display: "flex",
        position: 'relative'
    },
    item: {
        borderRadius: globalStyles(theme).borderRadius.borderRadius * 2
    },
    imageContainer: {
        padding: 5,
        borderRadius: globalStyles(theme).borderRadius.borderRadius * 2.5,
        borderWidth: 0.2,
        borderColor: typeTheme === 'dark' ? theme.color_border_secondary : theme.color_border_tertiary,
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2,
    },
    image: {
        flex: 1,
        borderRadius: globalStyles(theme).borderRadius.borderRadius * 2,
        borderWidth: 0.5,
        borderColor: theme.color_border_secondary,
        resizeMode: "cover",
        display: "flex",
        width: "100%",
        minHeight: 120
    },
    notImage: {
        flex: 1,
        display: "flex",
        width: "100%",
        minHeight: 120 + 10,
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom / 2,

        padding: 5,
        borderRadius: globalStyles(theme).borderRadius.borderRadius * 2.5,
        borderWidth: 0.2,
        borderColor: theme.color_border_tertiary,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    notImageBackground: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        borderWidth: 1,
        borderColor: theme.color_border_secondary,
        height: wp("15%"),
        width: wp("15%"),
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        transform: [{ rotate: '-25deg' }],
        position: "absolute",
        zIndex: 1
    },
    title: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        textTransform: "capitalize",
        paddingHorizontal: globalStyles(theme).globalPadding.padding / 2,
        paddingBottom: globalStyles(theme).globalPadding.padding / 3,
        display: "flex",
        textAlign: 'center',
        fontFamily: 'Rubik-Regular'
    }

});


export const ProductCardSelectTheme = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    CardSelect: {
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
    CardSelectInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        maxWidth: "90%"
    },
    CardSelectMessage: {
        fontSize: globalFont.font_normal,
        color: theme.text_color,
        fontFamily: 'Rubik-Regular'
    },
    CardSelectSubMessage: {
        fontSize: globalFont.font_sm,
        fontFamily: 'Rubik-Regular'
    },
    optionCheck: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: theme.text_color,
    }
})
