import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const colores = {
    primary: '#5856D6',
    color_primary: "#f1f1f1",
    color_secondary: "#b6c3ce1a",
    color_tertiary: "#0E1727",
    color_cuaternary: "#F9FAFA",

    //Colores
    color_red: "#ff0000",
    color_blue: "#068FFF",
    color_green: "#1F8A70",
    color_gray: "gray",
    color_yellow: "#EDBD42",
    color_black: "black",

    //Colores claros
    color_red_light: "#ff000056",


    //Border
    color_border: "#dfdfdf", 
    color_border_secondary: "#cacaca",
    color_border_tertiary: "#0E1727",

    //Text
    text_color: "#1d2a36", //Azul
    text_color_light: "#657482", //
    text_color_secondary: "#f9f9f9", //

    //Background
    background_color: "white",
    background_color_secondary: "#f9f9f9",
    background_color_tertiary: "#f1f1f1",
    background_color_blur: "rgba(0, 0, 0, 0.3)",
}


export const globalStyles = {
    globalPadding: {
        padding: wp("5%")
    },
    globalMarginBottom: {
        marginBottom:  hp("2.5%")
    },
    globalMarginBottomSmall: {
        marginBottom:  hp("1.75%")
    },
    blur: {
        backdropFilter: "blur(10px)",
        backgroundColor: " rgba(255, 255, 255, 0.2)"
    },
    divider: {
        width: "100%",
        height: "1px",
        background_color: colores.color_border,
        margin: "3em 0em",
    },
    disabled: {
        opacity: "50%"
    },
    borderRadius: {
        borderRadius: hp("1%"),
    }

};

export const globalFont = {
    //Font-size
    font_big: hp("4%"),
    font_med: hp("2.5%"),
    font_normal:  hp("1.75%"),
    font_sm: hp("1.5%"),
};
