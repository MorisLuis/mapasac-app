import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const SellsScreenStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SellsScreen: {
    },
    content: {
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        height: "100%"
    },
    header:{
        flexDirection: "row",
        marginBottom: hp("2.5%"),
        marginTop: hp("7.5%")
    }
})