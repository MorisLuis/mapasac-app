import { StyleSheet } from "react-native";
import { colores, globalStyles } from "./appTheme";



export const loginStyles = StyleSheet.create({
    LoginScreen: {
        flex: 1,
        backgroundColor: colores.background_color
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent:'center',
        height: 600,
        marginBottom: 50
    },
    imageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent:'center',
        width:"100%",
        height: "15%",
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    image: {
        maxWidth: "40%",
        objectFit: "cover",
        height:"100%"
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    }
});