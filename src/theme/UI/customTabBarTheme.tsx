import { StyleSheet } from "react-native";
import { colores, globalStyles } from "../appTheme";


export const customTabBarStyles = StyleSheet.create({
    customTabBar: {
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        left: 0,
        zIndex: 1,
        width: "100%",
        height: 35,
    },
    content: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: globalStyles.globalPadding.padding,
        height: 30
    },
    navigation: {
        display: "flex",
        flexDirection: "row"
    },
    navButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 30,
        minWidth: 100,
        marginRight: 10,
        borderWidth: 0.7,
        borderColor: "black",
        overflow: "hidden"
    },
    bagContent: {
        display: "flex"
    },
    bag: {
        backgroundColor: colores.color_tertiary,
        height: 30,
        borderRadius: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10
    },
    bagNumber: {
        color: colores.text_color,
        paddingHorizontal: 5
    },
    blurContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
    },
});