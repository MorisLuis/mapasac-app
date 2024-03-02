import { StyleSheet } from 'react-native';

export const colores = {
    primary: '#5856D6',
    color_primary: "#f1f1f1",
    color_secondary: "hsla(207, 20%, 76%, 0.1)",
    color_tertiary: "#0E1727",
    color_cuaternary: "#F9FAFA",

    //Colores
    color_red: "#ff0000",
    color_blue: "#068FFF",
    color_green: "#1F8A70",
    color_gray: "gray",
    color_yellow: "#EDBD42",

    //Border
    color_border: "#dfdfdf",
    color_border_secondary: "#cacaca",
    color_border_tertiary: "#0E1727",

    //Text
    text_color: "rgb(29 42 54/1)",
    text_color_light: "rgb(101 116 130/1)",
    text_color_secondary: "#f9f9f9",

    //Background
    background_color: "white",
    background_color_secondary: "#f9f9f9",
    background_color_tertiary: "#f1f1f1",
    background_color_gradient: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(237,237,237,1) 47%, rgba(237,237,237,1) 59%, rgba(245,147,212,0.05) 86%, rgba(9,118,223,0.05) 98%)",
    background_color_gradient_second: "radial-gradient(circle, rgba(6,143,255,1) 0%, rgba(255,0,0,1) 50%, rgba(6,143,255,1) 100%)"
}


export const globalStyles = {
    globalPadding: {
        padding: 10
    },
    globalMarginBottom: {
        marginBottom: 20
    },
    globalMarginBottomSmall: {
        marginBottom: 10
    },
    blur: {
        //-webkit-backdrop-filter: blur(10px);
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
    }

};

export const globalFont = {
    //Font-size
    font_big: 60,
    font_med: 30,
    font_normal: 16,
    font_sm: 14,
};
