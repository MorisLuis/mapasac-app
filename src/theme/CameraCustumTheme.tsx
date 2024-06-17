
import { StyleSheet } from "react-native";
import { colores, globalFont, globalStyles } from "./appTheme";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const cameraStyles = StyleSheet.create({
    cameraScreen: {
        flex: 1,
        backgroundColor: colores.color_black,
        position: "relative"
    },
    camera: {
        flex: 1,
        height: hp("100%"),
        width: wp('100%'),
        position: "absolute",
        top: 0
    },
    backgroundBlurTop: {
        backgroundColor: colores.background_color_blur,
        width: wp('100%'),
        height: hp("32.5%"),
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2
    },
    backgroundBlurBottom: {
        backgroundColor: colores.background_color_blur,
        width: wp('100%'),
        height: hp("32.5%"),
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2
    },
    scannerOptions: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        bottom: hp("10%"),
        right: wp("7.5%"),
        padding: globalStyles.globalPadding.padding / 2,
        zIndex: 2
    },
    option: {
        borderRadius: 30,
        padding: 5,
    },
    optionContent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: globalStyles.globalPadding.padding / 2,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "black"
    },
    message: {
        position: "absolute",
        top: hp("25%"),
        left: wp("20%"),
        width: wp("60%"),
        display: "flex",
        alignItems: "center",
        textAlign: 'center',
        zIndex: 2
    },
    textmessage: {
        color: colores.text_color_secondary,
        display: "flex",
        alignItems: "center",
        textAlign: 'center',
        fontSize: globalFont.font_normal
    },
    scanSvgContainer: {
        position: "absolute",
        top: hp("50%"),
        left: wp("50%"),
        transform: [{ translateX: -150 }, { translateY: -150 }],
        zIndex: 2
    },
    flash: {
        position: "absolute",
        right: "7.5%",
        top: 100,
        zIndex: 2
    },
    blurOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
})
