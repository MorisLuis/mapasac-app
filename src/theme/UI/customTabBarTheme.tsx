import { StyleSheet } from "react-native";
import { colores, globalFont, globalStyles } from "../appTheme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const customTabBarStyles = StyleSheet.create({
    customTabBar: {
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        left: 0,
        zIndex: 1,
        width: "100%",
        height: globalFont.font_med,
        paddingTop: hp("1%"),
    },
    content: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: globalStyles.globalPadding.padding
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
        borderColor: "black",
        overflow: "hidden"
    },
    bag: {
        backgroundColor: colores.color_tertiary,
        height: hp("5%"),
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: globalStyles.globalPadding.padding
    },
    sectionBag: {
        color: colores.text_color_secondary,
        fontSize: globalFont.font_normal
    },
    blurContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        paddingHorizontal: wp("2%"),
        //backgroundColor: colores.background_color_blur
    },
    sectionTitle: {
        fontSize: globalFont.font_normal
    }
});