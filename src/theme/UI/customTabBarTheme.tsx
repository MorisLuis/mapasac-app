import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "../appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const customTabBarStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    customTabBar: {
        paddingVertical: globalStyles().globalPadding.padding
    },
    customTabBarAbsolute: {
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        left: 0,
        zIndex: 1,
        width: "100%",
        paddingVertical: globalStyles().globalPadding.padding
    },
    content: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        justifyContent: "space-between"
    },
    content_left: {
        display: "flex",
        flexDirection: "row"
    },
    content_right: {
        display: "flex",
        flexDirection: "row"
    },
    buttonBack: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: hp("5%"),
        width: hp("5%"),
        maxHeight: 32,
        marginRight: wp("2%"),
        borderWidth: 1,
        borderColor: theme.color_border_dark,
        backgroundColor: theme.background_color
    },
    buttonBag: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: hp("5%"),
        width: hp("5%"),
        maxHeight: 32,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_dark : theme.color_border_secondary,
        backgroundColor: theme.background_color
    },
    navigation: {
        display: "flex",
        flexDirection: "row"
    },
    navButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: hp("5%"),
        maxHeight: 32,
        marginRight: wp("2%"),
        borderWidth: 0.7,
        borderColor: typeTheme === 'light' ? theme.color_border : theme.color_black,
        overflow: "hidden"
    },
    bag: {
        backgroundColor: theme.color_tertiary,
        height: hp("5%"),
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: globalStyles(theme).globalPadding.padding
    },
    bagCounter: {
        position: "absolute",
        width: hp("3%"),
        height: hp("3%"),
        top: - globalStyles(theme).globalPadding.padding / 2,
        right: - globalStyles(theme).globalPadding.padding / 2,
        borderRadius: globalStyles(theme).borderRadius.borderRadius * 2,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_dark : theme.color_border_dark,
        justifyContent: "center",
        alignItems: "center"
    },
    sectionBag: {
        fontSize: globalFont.font_normal,
        color: theme.text_color
    },
    blurContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        paddingHorizontal: wp("2%")
    },
    sectionTitle: {
        fontSize: globalFont.font_normal
    }
});
