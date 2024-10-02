import { StyleSheet } from "react-native";
import { Theme, globalStyles } from "../appTheme";


export const ModalBottomStyles = (theme: Theme, typeTheme?: string ) =>  StyleSheet.create({
    modalBottom: {
        flex: 1,
        justifyContent: "flex-end",
        //position: 'relative',
        padding: globalStyles(theme).globalPadding.padding / 2.5
    },
    modalContent: {
        backgroundColor: theme.background_color,
        shadowColor: theme.background_color_tertiary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "100%",
        borderRadius: globalStyles(theme).borderRadiusStandard.borderRadius * 2,
        borderWidth: 1,
        borderColor: typeTheme === 'light' ? theme.color_border_secondary : theme.background_color
    },
    modalChildren: {
        padding: globalStyles(theme).globalPadding.padding,
        paddingTop: 10
    },
    header: {
        width: "100%",
        top: 0,
        right: 0,
        paddingVertical: 10,
        paddingHorizontal: 20,
        display: "flex",
        alignItems: "flex-end",
        borderWidth: 1,
        borderColor: 'transparent',
        borderBottomColor: typeTheme === 'light' ? theme.color_border_secondary : theme.color_border_dark,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    }
});
