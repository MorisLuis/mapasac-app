
import { StyleSheet } from "react-native";
import { colores } from "./appTheme";

export const cameraStyles = StyleSheet.create({
    cameraScreen: {
        flex: 1,
        backgroundColor: colores.background_color,
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        flex: 1,
        width: "100%",
        height: "100%",
        borderEndEndRadius: 20,
        borderEndStartRadius: 20,
        overflow: "hidden"
    },
    camera: {
        flex: 1,
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0
    },
    scannerOptions: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        bottom: "10%",
        right: "7.5%",
        padding: 5,
    },
    option: {
        borderRadius: 30,
        padding: 5,
    },
    optionContent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: "black"
    },
    message: {
        position: "absolute",
        top: "25%",
        left: "25%",
        width: "50%",
        display: "flex",
        alignItems: "center",
        textAlign: 'center',
        zIndex: 2
    },
    textmessage: {
        color: colores.text_color_secondary,
        display: "flex",
        alignItems: "center",
        textAlign: 'center'
    },
    scanSvgContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -150 }, { translateY: -150 }],
        zIndex: 2
    },
    flash: {
        position: "absolute",
        right: "7.5%",
        top: 100
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
