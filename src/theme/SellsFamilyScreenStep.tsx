import { StyleSheet } from "react-native";
import { Theme, globalFont, globalStyles } from "./appTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const SellsFamilyScreenStepStyles = (theme: Theme, typeTheme?: string) => StyleSheet.create({
    SellsFamilyScreenStep: {
        height: "auto"
    },
    content: {
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        height: "100%"
    },
    header: {

    },
    headerTitle: {
        color: theme.text_color,
        fontSize: globalFont.font_med,
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom
    },
    headerSubtitle: {
        color: theme.text_color,
        fontSize: globalFont.font_normal,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom,
        fontWeight: "bold"
    },


    //Step 1
    SellsFamilyScreenStep1_grid: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        columnGap: globalStyles(theme).globalMarginBottom.marginBottom / 3,
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom / 2
    },
    SellsFamilyScreenStep1_card: {
        display: "flex",
        flexDirection: 'row',
        margin: globalStyles(theme).globalMarginBottom.marginBottom / 2,
        borderRadius: globalStyles(theme).borderRadius.borderRadius * 2

    },
    SellsFamilyScreenStep1_card_text: {
        borderWidth: 1,
        paddingHorizontal: globalStyles(theme).globalPadding.padding,
        borderRadius: globalStyles(theme).borderRadius.borderRadius * 2,
        paddingVertical: globalStyles(theme).globalPadding.padding / 2
    },


    //Step 2
    SellsFamilyScreenStep2: {
        display: "flex",
        flexDirection: "column",
        marginBottom: globalStyles(theme).globalMarginBottom.marginBottom
    },
    optionContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        backgroundColor: theme.background_color_secondary,
        marginBottom: globalStyles(theme).globalMarginBottomSmall.marginBottom,
        padding: globalStyles(theme).globalPadding.padding / 2,
        borderRadius: globalStyles(theme).borderRadius.borderRadius,
        borderWidth: 1,
        borderColor: theme.color_border_secondary
    }
})