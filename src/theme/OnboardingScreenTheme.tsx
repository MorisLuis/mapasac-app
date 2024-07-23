import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const OnboardingScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    OnboardingScreen: {
        padding: globalStyles(theme).globalPadding.padding,
        backgroundColor: theme.background_color,
        height: hp('100%')
    },
    topbar: {
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        height: hp('5%'),
        minHeight: 40,
        width: wp("100%"),

        display:"flex",
        flexDirection: "row",
        justifyContent: "flex-end" 
    },
    header:{
        width: wp("100%"),
        marginBottom: hp("1%")
    },
    headerTitle: {
        fontSize: globalFont.font_big,
        color: theme.text_color,
        paddingHorizontal: globalStyles(theme).globalPadding.padding
    },
    content: {
        flex: 2,
        marginHorizontal: "auto",
        width: 400,
        paddingHorizontal: globalStyles(theme).globalPadding.padding
    },
    moduleOptionRow: {
        flexDirection: "row",
        gap: globalStyles(theme).globalPadding.padding / 2,
        marginBottom: globalStyles(theme).globalPadding.padding / 2,
        height: hp("12.5%")
    },
    moduleOption: {
        borderWidth: 1,
        flex: 1,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        display: "flex",
        justifyContent: "space-between",
        padding: globalStyles(theme).globalPadding.padding / 2
    },
    moduleOption2: {
        borderWidth: 0,
        flex: 1,
        padding: globalStyles(theme).globalPadding.padding / 2,
    },
    optionText:{
        fontSize: globalFont.font_normal,
        color: theme.text_color
    }

})